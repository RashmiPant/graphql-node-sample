exports.feed = async function (parent, args, context, info) {
    const { skip, take, orderBy } = args
    const where = args.filter
        ? {
            OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } }
            ]
        } : {};
    const links = await context.prisma.link.findMany({ where, skip, take, orderBy })
    const count = await context.prisma.link.count({ where })
    return { links, count }
}