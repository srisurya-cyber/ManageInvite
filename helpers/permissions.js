module.exports = [
    {
        level: 0,
        name: "User",
        check: () => true,
    },
    {
        level: 1,
        name: "Moderator",
        check: (message) => (message.guild ? message.member.hasPermission("MANAGE_MESSAGES") : false),
    },
    {
        level: 2,
        name: "Administrator",
        check: (message) => (message.guild ? message.member.hasPermission("ADMINISTRATOR") : false),
    },
    {
        level: 3,
        name: "Owner",
        check: (message) => (message.guild ? message.author.id === (message.guild.owner || { user: { id: null } }).user.id : false),
    },
    {
        level: 4,
        name: "Bot moderator",
        check: (message) => {
            return (
                [ "654754795336237058", "456500252048883714", "547514927019982864", "246993557381054465", "675636857463373847", "592782178350399673" ].includes(message.author.id)
                || (
                    message.client.guilds.cache.has(message.client.config.supportServer)
                        ? (
                            message.client.guilds.cache.get(message.client.config.supportServer).members.cache.get(message.author.id)
                                ? message.client.guilds.cache.get(message.client.config.supportServer).members.cache.get(message.author.id).roles.cache.has(message.client.config.modRole)
                                : false)
                        : false)
            );
        }
    },
    {
        level: 5,
        name: "Bot owner",
        check: (message) => message.client.config.owners.includes(message.author.id),
    }
];
