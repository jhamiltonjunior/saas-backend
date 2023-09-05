const obj = {
  NOT: 'this.prisma.users.fields.user_id',
  name: 'John',
}

const obj2 = {
  where: {
    email: 'email',
    ...obj[0]
  }
}

console.log(obj2)
