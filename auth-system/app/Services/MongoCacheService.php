<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use MongoDB\Client;
use MongoDB\Driver\BulkWrite;

abstract class MongoCacheService
{
    protected Client $mongo;
    protected string $collectionName;

    public function __construct(string $collectionName)
    {
        $this->mongo = MongoService::getClient();
        $this->collectionName = $collectionName;
    }

    /**
     * Get Mongo collection instance
     */
    protected function getCollection()
    {
        return $this->mongo
            ->selectDatabase('read_model')
            ->selectCollection($this->collectionName);
    }

    /**
     * Paginate documents from MongoDB
     */
    public function paginate(int $page = 1, int $perPage = 10): array
    {
        $skip = ($page - 1) * $perPage;
        $collection = $this->getCollection();

        // Only fetch necessary fields if possible
        $cursor = $collection->find(
            [],
            [
                'skip' => $skip,
                'limit' => $perPage,
                'sort' => ['created_at' => -1],
            ]
        );

        $items = iterator_to_array($cursor, false);
        $total = $collection->countDocuments();
        $lastPage = (int) ceil($total / $perPage);

        return [
            'data'      => array_map([$this, 'mapDocument'], $items),
            'current'   => $page,
            'per_page'  => $perPage,
            'total'     => $total,
            'last_page' => $lastPage,
        ];
    }

    /**
     * Fetch all documents (use for small datasets)
     */
    public function fetchAll(): array
    {
        return Cache::remember("{$this->collectionName}_all", now()->addMinutes(10), function () {
            $collection = $this->getCollection();

            // Fetch all documents sorted by created_at
            $cursor = $collection->find([], ['sort' => ['created_at' => -1]]);
            $docs = iterator_to_array($cursor, false);

            return array_map([$this, 'mapDocument'], $docs);
        });
    }

    /**
     * Refresh cache manually
     */
    public function refreshCache(): void
    {
        Cache::forget("{$this->collectionName}_all");
        $this->fetchAll(); // Rebuild cache
    }

    /**
     * Find a document by id
     */
    public function find(string|int $id): ?array
    {
        $doc = $this->getCollection()->findOne(['id' => (int)$id]);
        return $doc ? $this->mapDocument($doc) : null;
    }

    /**
     * Upsert multiple documents into Mongo (bulk operation)
     * This improves performance for large datasets
     */
    protected function storeInMongo(array $items): void
    {
        if (empty($items)) return;

        $collection = $this->getCollection();
        $bulkOps = [];

        foreach ($items as $item) {
            $bulkOps[] = [
                'replaceOne' => [
                    ['id' => $item['id']],
                    $item,
                    ['upsert' => true]
                ]
            ];
        }

        if (!empty($bulkOps)) {
            $collection->bulkWrite($bulkOps);
        }
    }

    /**
     * Every child service must implement mapping logic
     */
    abstract protected function mapDocument($doc): array;
}
