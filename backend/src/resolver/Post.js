function postedBy(parent,args,context,info){
    return context.prisma.post({id:parent.id}).postedBy()
}
module.exports ={
    postedBy
}