# Cache API

# Project Description

This is a REST API that allows to do 2 things: 
* Save cache keys with their value and TTL
* Retrieve a cache key with their value and how much time is left for expiration in seconds

Under the hood, the cache keys are saved in a Map data structure, in the following format:
cache_key : { value: cache_value, expiresOn: datetime_that_the_cache_key_expires  }

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

