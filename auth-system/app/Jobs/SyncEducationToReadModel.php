<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Models\Education;
use MongoDB\Client;

class SyncEducationToReadModel implements ShouldQueue
{
    use Dispatchable, Queueable, InteractsWithQueue, SerializesModels;

    protected int $id;
    protected string $action;

    public function __construct(int $id, string $action = 'update')
    {
        $this->id = $id;
        $this->action = $action;
    }

    public function handle()
    {
        $education = Education::find($this->id);
        if (!$education) return;

        $client = new Client(env('MONGODB_URI', 'mongodb://mongo:27017'));
        $collection = $client->selectDatabase(env('MONGO_DB_DATABASE', 'read_model'))
                             ->selectCollection('educations');

        $document = [
            '_id' => $education->id,
            'id' => $education->id,
            'user_id' => $education->user_id,
            'institution' => $education->institution,
            'degree' => $education->degree,
            'location' => $education->location,
            'start_date' => $education->start_date,
            'end_date' => $education->end_date,
            'is_current' => $education->is_current,
            'details' => $education->details,
            'created_at' => $education->created_at,
            'updated_at' => $education->updated_at,
        ];

        if ($this->action === 'update') {
            $collection->updateOne(
                ['_id' => $education->id],
                ['$set' => $document],
                ['upsert' => true]
            );
        } elseif ($this->action === 'delete') {
            $collection->deleteOne(['_id' => $education->id]);
        }
    }
}
