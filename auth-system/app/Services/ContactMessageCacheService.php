<?php

namespace App\Services;

use App\Repositories\ContactMessageRepository;
use MongoDB\Collection;

class ContactMessageCacheService extends MongoCacheService
{
    protected ContactMessageRepository $repo;
    protected string $cacheKeyUnread;

    public function __construct(ContactMessageRepository $repo)
    {
        parent::__construct('contact_messages');
        $this->repo = $repo;
        $this->cacheKeyUnread = 'contact_messages_unread';
    }

    /**
     * Fetch all messages and cache in Mongo
     */
    public function fetchAll(): array
    {
        $messages = $this->repo->all()
            ->filter(fn($m) => empty($m['deleted_at']));

        $mapped = $messages->map(fn($msg) => $this->mapDocument($msg))->toArray();

        $this->storeInMongo($mapped);

        return $mapped;
    }

    /**
     * Fetch unread messages only (cached separately)
     */
    public function fetchUnread(): array
    {
        return $this->fetchAllUncached();
    }

    protected function fetchAllUncached(): array
    {
        $cursor = $this->getCollection()->find(['is_read' => false], ['sort' => ['created_at' => -1]]);
        $docs = iterator_to_array($cursor, false);
        return array_map([$this, 'mapDocument'], $docs);
    }

    /**
     * Map Mongo document to array
     */
    protected function mapDocument($doc): array
    {
        if ($doc instanceof \Illuminate\Database\Eloquent\Model) {
            $doc = $doc->toArray();
        } else {
            $doc = json_decode(json_encode($doc), true);
        }

        return [
            'id'         => $doc['id'] ?? (string)($doc['_id'] ?? ''),
            'name'       => $doc['name'] ?? null,
            'email'      => $doc['email'] ?? null,
            'subject'    => $doc['subject'] ?? null,
            'message'    => $doc['message'] ?? null,
            'is_read'    => $doc['is_read'] ?? false,
            'created_at' => $doc['created_at'] ?? null,
            'updated_at' => $doc['updated_at'] ?? null,
        ];
    }

    /**
     * Refresh entire cache manually
     */
    public function refreshCache(): void
    {
        $messages = $this->repo->all()
            ->filter(fn($m) => empty($m['deleted_at']))
            ->map(fn($msg) => $this->mapDocument($msg))
            ->toArray();

        $this->storeInMongo($messages);
    }

    /**
     * Store messages in Mongo and remove stale documents
     */
    protected function storeInMongo(array $messages)
    {
        $collection = $this->getCollection();
        $idsToKeep = array_column($messages, 'id');

        // Remove stale messages
        $collection->deleteMany(['id' => ['$nin' => $idsToKeep]]);

        // Upsert all messages
        foreach ($messages as $msg) {
            $collection->replaceOne(
                ['id' => $msg['id']],
                $msg,
                ['upsert' => true]
            );
        }
    }
}
