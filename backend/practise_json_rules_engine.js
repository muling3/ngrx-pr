require("colors");
const jsRules = require("json-rules-engine");
const axios = require("axios");

async function start() {
  let engine = new jsRules.Engine();
  /**
   * Create a rule Way 1
   */
  //   engine.addRule({
  //     conditions: {
  //       any: [
  //         {
  //           all: [
  //             {
  //               fact: "gameDuration",
  //               operator: "equal",
  //               value: 40,
  //             },
  //             {
  //               fact: "personalFoulCount",
  //               operator: "greaterThanInclusive",
  //               value: 5,
  //             },
  //           ],
  //           name: "short foul limit",
  //         },
  //         {
  //           all: [
  //             {
  //               fact: "gameDuration",
  //               operator: "equal",
  //               value: 48,
  //             },
  //             {
  //               not: {
  //                 fact: "personalFoulCount",
  //                 operator: "lessThan",
  //                 value: 6,
  //               },
  //             },
  //           ],
  //           name: "long foul limit",
  //         },
  //       ],
  //     },
  //     event: {
  //       // define the event to fire when the conditions evaluate truthy
  //       type: "fouledOut",
  //       params: {
  //         message: "Player has fouled out!",
  //       },
  //     },
  //     onFailure: (evt, almanac) => {
  //       console.log(JSON.stringify(evt) + " rule failed ");
  //     },
  //   });

  /**
   * Create a rule for Dynamic Data
   */

  const todoRule = new jsRules.Rule({
    conditions: {
      all: [
        {
          fact: "todoDetails",
          operator: "equal",
          params: {
            todoId: 2,
          },
          value: "quis ut nam facilis et officia qui",
          path: "$.title",
        },
        {
          not: {
            fact: "todoDetails",
            operator: "equal",
            value: true,
            path: "$.completed",
          },
        },
        {
          fact: "todoDetails",
          operator: "equal",
          value: 1,
          path: "$.userId",
        },
        {
          fact: "todoDetails",
          operator: "equal",
          value: 2,
          path: "$.id",
        },
      ],
    },
    event: {
      type: "getting-dynamic-todo-details",
      params: {
        msg: "Todo found first one".bgYellow.black.bold,
      },
    },
    onFailure: (evt, almanac) => {
      console.log("Details werent found");
    },
  });

  //setting the rule
  engine.addRule(todoRule);

  // user rule
  const todoOwnerRule = new jsRules.Rule({
    conditions: {
      all: [
        {
          fact: "todoOwner",
          operator: "equal",
          value: "Leanne Graham",
          params: {
            userId: 1,
          },
          path: "$.name",
        },
        {
          fact: "todoOwner",
          operator: "equal",
          value: "Bret",
          params: {
            userId: 1,
          },
          path: "$.username",
        },
        {
          fact: "date",
          operator: "greaterThan",
          value: 1467331200000,
        },
      ],
    },
    event: {
      type: "get the todo owner",
      params: {
        msg: "The todo user matches this provided user".bgYellow.black.bold,
      },
    },
    onFailure: (evt, almanac) => {
      console.log(
        "The todo user DOESN'T match this provided user".bgRed.blue.bold
      );
    },
  });

  engine.addRule(todoOwnerRule);

  // adding event listeners
  engine.on("success", (evt) => {
    console.log("event type success " + evt.type);
  });

  engine.on("failure", (evt) => {
    console.log("event type failure " + evt.type);
  });
  /**
   * Define a 'displayMessage' as a constant value
   * Fact values do NOT need to be known at engine runtime; see the
   * 03-dynamic-facts.js example for how to pull in data asynchronously during runtime
   */

  //    adding fact Way 1
  //   const facts = {
  //     personalFoulCount: 4,
  //     gameDuration: 40,
  //   };

  //    adding fact Way 2 => Dynamic Fact
  //   engine.addFact("gameDuration", (params, almanac) => {
  //     return almanac.factValue("personalFoulCount").then((foulCount) => {
  //       return 48; // here return whatever value you want
  //     });
  //   });

  //   const facts = {
  //     personalFoulCount: 6,
  //   };

  //todo dynamic fact one
  engine.addFact(
    "todoDetails",
    async (params, almanac) => {
      return almanac.factValue("todoId").then(async (todoId) => {
        console.log('"todoDetails" fact...');

        let res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`
        );
        // console.log("par.todoId", par.todoId);
        return res.data;
      });
    },
    { priority: 20 }
  );

  //todo dynamic fact two
  engine.addFact(
    "todoOwner",
    async (params, almanac) => {
      return almanac.factValue("todoDetails").then(async (todo) => {
        console.log('"todoOwner" fact...');

        let res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${todo.userId}`
        );
        console.log("par.todoId", params.userId, "userId ", todo.userId);
        return res.data;
      });
    },
    { priority: 10 }
  );

  // date fact
  engine.addFact(
    "date",
    (params, almanac) => {
      console.log('"date" fact...');
      return Date.now();
    },
    { priority: 30 }
  );

  //passing the fact
  let facts = { todoId: 2 };

  // engine.run() evaluates the rule using the facts provided
  const { events } = await engine.run(facts);

  console.log("events length => ", events.length);

  events.map((event) => console.log(event.params.msg.red));
}

start();
