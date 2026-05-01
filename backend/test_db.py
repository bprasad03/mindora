from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

MONGO_URI = "mongodb://localhost:27017/mindora"


def main():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        # Trigger a connection check
        client.admin.command('ping')
    except ConnectionFailure as exc:
        print(f"Failed to connect to MongoDB: {exc}")
        return

    print("MongoDB connection successful!")

    db = client.mindora
    users_collection = db.users

    users = list(users_collection.find())

    if not users:
        print("No users found. The database is connected but empty.")
        return

    print(f"Found {len(users)} user(s) in the 'users' collection:")
    for idx, user in enumerate(users, start=1):
        print(f"\nUser #{idx}:")
        for key, value in user.items():
            print(f"  {key}: {value}")


if __name__ == '__main__':
    main()
