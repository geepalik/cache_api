# Cache API

# Project Description

This is a REST API that allows to do 2 things:
* Save cache keys with their value and TTL
* Retrieve a cache key with their value and how much time is left for expiration in seconds

Under the hood, the cache keys are saved in a Map data structure, in the following format:

cache_key : { value: cache_value, expiresOn: datetime_that_the_cache_key_expires }

When setting a cache key, the expiration date is calculated by the hours, minutes and seconds in the request body.

When requesting the data of a cache key, the following checks are performed:
* Does the cache key exists in the data structure?
* If exists, does its TTL still not reached yet?

If any of the above are false, then a response with HTTP status code 404 is returned.

If not, then the remaining TTL time is calculated until the expiration date is reached, in seconds.

I added unit tests to confirm cases of the service that calls on the Cache Repository:
* Setting a cache key and getting it, returns its key, value and ttl expiration, as expected.
* Setting a cache key with the short expiration time, when trying to get it, an error is thrown with message that the requested cache key cannon be found.

In a production-grade application I would have also wrote end-to-end tests, to test the entire flow of each HTTP request.

# Assumptions

* When making a request to set a cache key, on the same cache key more than one time, then its ttl is updated. E.g. if made a /set request to set a cache key "cacheKey1" with 2 hours until expiration, and after it, another request on the same cache key with expiration time 30 seconds, its expiration date will be updated with the latest request.
* All the required authentication and authorization are already completed.

# Limitations

* Since the data are saved in an in-memory data structure, every time the application restarts, the data is deleted.
* In the way it works now, expired cache keys will stay in the data structure, until requested to make the check and delete them (passive expiration). This will cause a lot of unused data to fill the data structure. This can be improved in two ways:
    * Having an active way of expiration, e.g. a cron or an external microservice that talks with this via HTTP or queue, checks for expired keys and deletes them.
    * Implement an LRU (least recently used) way of caching. This would require two data structures: 
        * A queue in a form of doubly linked list with fixed size. The most recently used pages will be near the front end and the least recently used pages will be near the rear end.
        * A hash with the page number as key and the address of the corresponding queue node as value.
    * That would allow faster access and updates. The downside of LRU is that's a space heavy solution, since it needs another data structure. Also, like the current implementation, an expired key would still stay in the data structure until requested.

# Recommendations for Scaling

* Distributed caching: Instead of relying on a single cache instance, we can distribute the cache across multiple servers or nodes. This allows for better scalability and handles larger workloads by reducing the load on individual nodes.
* Load balancing: we can implement a load balancing mechanism to distribute incoming requests across multiple cache servers. Load balancing ensures that the workload is evenly distributed and prevents any single cache server from becoming a bottleneck.
* Replication: By replicating cache data across multiple nodes, we can achieve high availability. If one node fails, the data can still be retrieved from the replicated copies, ensuring uninterrupted access to the cached content.
* Cache eviction strategies: we can optimize the cache eviction strategy to handle larger workloads effectively with LRU (see above at limitations).

# Instructions for Running the Project

Needs Docker installed to run, no need to install other dependencies.

Clone repository in target path
-----

    git clone https://github.com/geepalik/queue_home_assignment.git

Rename .env.example to .env
-----

    .env

Run Docker containers
-----
In the project root directory run this to create containers and run them in background:
-----
    docker-compose up -d --build 

Requests
-----
The main URL for requests is this:
-----
    http://localhost:8081/api/v1/


Create an data in cache (POST):

    http://localhost:8081/api/v1/data/set


In request body, add data:

{
    "key": "newKey",
    "value": "ABC",
    "hours": 0,
    "minutes": 0,
    "seconds": 30
}

Get a key in cache (GET):

    http://localhost:8081/api/v1/data/get?key=newKey

If exists, it will return the following data:

{
    "key": "newKey",
    "value": "ABC",
    "ttl_seconds": 27
}

If not, the response will have 404 HTTP status, with the following data:

{
    "error": "The requested key was not found",
    "details": "Key newKey was not found in the current cache"
}

Run tests
-----
    npm run test
