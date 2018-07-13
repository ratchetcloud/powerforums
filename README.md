# forums-frontend

This project is frontend part for opensource game forum.

## How to start

1. npm install 

2. npm run start


## How to use
- Add create thread function

When parent node exists, insert next code in render() of class you want to add create thread function

```html+javascript
import CreateTopicForm from '../forms/CreateTopicForm'

...

<div><CreateTopicForm /></div>
```

