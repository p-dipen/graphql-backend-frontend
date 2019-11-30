const { getUserId } = require("../utils");
async function userList(parent, args, context, info) {
  return context.prisma.users();
}
async function postList(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.posts({where:{postedBy:{id:userId}}});
}
module.exports = {
  userList,
  postList
};
