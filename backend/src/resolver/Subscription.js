const { getUserIDSubscription } = require("../utils");

async function newPostSubscribe(parent, args, context, info) {
  const userId = getUserIDSubscription(context);
  return context.prisma.$subscribe.post({
    node: { postedBy: { id: userId } },
    mutation_in: ["CREATED", "UPDATED", "DELETED"]
  });
}

const newPost = {
  subscribe: newPostSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newPost
};
