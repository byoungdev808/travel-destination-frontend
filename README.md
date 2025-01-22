# Travel Destination App - Frontend

## Install

### 1. Add env var

- Create .env.local
- Copy environment variables from .env.example and replace with your own api keys

### 2. Install

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend

See https://github.com/byoungdev808/travel-destination-backend for associated backend.

## Intro

This is an app to demo AI chat agent's capability to perform Q&A on user saved information. User can save a travel destination of their liking and add knowledge cards to store notes about thier travel destination.

### Examples
Below are some example questions grouped into 7 categories commonly tested for RAG system (see [CRAG](https://arxiv.org/abs/2406.04744v1) paper)

---

#### Simple
 	
Questions asking for simple facts that are unlikely to change overtime, such as the birth date of a person and the authors of a book.

**Ex. What are some of my notes about Los Angeles?**

---

#### Simple w. Condition
 	
Questions asking for simple facts with some given conditions, such as stock prices on a certain date and a director’s recent movies in a certain genre.

**Ex. What did I say about the food in Los Angeles**

---

#### Set
 	
Questions that expect a set of entities or objects as the answer

**Ex. What are the locations I saved that are in the US?**

---

#### Comparison
 	
Questions that compare two entities.

**Ex. Which location has the coolest weather, Los Angeles or New York?**

---

#### Aggregation
 	
Questions that require aggregation of retrieval results to answer

**Ex. How many locations do I think that has good sushi?**

(Context: Added a note in both Tokyo and Los Angeles that it has good sushi)

---

#### Multi-hop
 	
Questions that require chaining multiple pieces of information to compose the answer.

**Ex. What is the weather like for the city where I think has nice beaches?**

---

#### Post-processing heavy
 	
Questions that need reasoning or processing of the retrieved information to obtain the answer.

**Ex. What is the average temperature from all the saved locations combined?**

---

#### False Premise

Questions that have a false preposition or assumption.

**Ex. What is name of the restaurant in London where the food tasted good?**

(Context: Added a note saying London has bad food.)
 
