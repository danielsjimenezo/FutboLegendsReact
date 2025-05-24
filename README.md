## UPDATING THE DATA

In the future, the data may be fetched from an API or scraped from some other website(s), but right now, the data for all the players is in JSON files in public/Data. To update the data, follow these steps:

1. Paste JSON in to public/Data/input.json
2. run the command `npm run process-data` and the processed data will be written to public/Data/output.json
3. copy the contents of public/Data/output.json and paste them into public/Data/data.json

public/Data/data.json is where the front end reads from currently.

## IMPORTANT NOTE TO FUTURE DEVELOPERS

In src/utilities/futbolDataTypes.js, there is an array of objects, where each object represents of "data type" pertaining to some numerical value related to the player-- e.g. goals, assists, etc... These ids must be the same as the keys of the players on the incoming data. Case sensitive.

# Start the postgres server:

```bash
brew services start postgresql@17
```
