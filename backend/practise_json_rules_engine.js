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
        msg: "Todo found",
      },
    },
    onFailure: (evt, almanac) => {
      console.log("Details werent found");
    },
  });

  //setting the rule
  engine.addRule(todoRule);

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

  //todo dynamic fact
  engine.addFact("todoDetails", async (params, almanac) => {
    return almanac.factValue("todoId").then(async (todoId) => {
    let res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
    // console.log("par.todoId", par.todoId);
    return res.data;
    });
  });

  //passing the fact
  let facts = { todoId: 2 };

  // engine.run() evaluates the rule using the facts provided
  const { events } = await engine.run(facts);

  console.log("events length => ", events.length);

  events.map((event) => console.log(event.params.msg.red));
}

start();
