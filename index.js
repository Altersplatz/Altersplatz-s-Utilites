require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()

const path = require('path')
const fs = require('fs')

const config = require('@root/config.json')
const command = require('@util/command.js')
const poll = require('@features/poll.js')
const welcome = require('@features/welcome.js')
const antiAd = require('@features/anti-ad.js')
const inviteNotifications = require('@features/invite-notification.js')
const advancedPolls = require('@features/advanced-polls.js')

client.on('ready' , async () => {

    console.log('The client is ready!');

    const baseFile = 'command-base.js'
    const commandBase = require(`@root/commands/${baseFile}`)

    const readCommands = dir => {

        const files = fs.readdirSync(path.join(__dirname , dir))

        for(const file of files){

            const stat = fs.lstatSync(path.join(__dirname , dir , file))

            if(stat.isDirectory()){

                readCommands(path.join(dir , file))

            } else if(file !== baseFile){

                const option = require(path.join(__dirname , dir , file))
                commandBase(option)

            }

        }

    }

    readCommands('commands')
    commandBase.listen(client)

    poll(client)
    welcome(client)
    antiAd(client)
    inviteNotifications(client)
    advancedPolls(client)

    command(client , ['ping'] , (message) => {

        message.reply('Pong!')

    })
    
    command(client , 'help' , (message) => {

        message.channel.send(`
        
            **These are my supported commands:**

            **>ping** - Pong!
            **>help** - Displayes the help menu
            **>serverinfo** - Displayes the server information
            
        
        `)

    })

    command(client , ['cc' , 'clearchannel'] , (message) => {

        if(message.member.hasPermission('MANAGE_CHANNELS')){

            message.channel.messages.fetch().then((results) => {

                message.channel.bulkDelete(results)

            })

        }

    })

    command(client , 'serverinfo' , (message) => {

        const { guild } = message

        const { name , region , memberCount , owner , afTimeout } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(

                {

                    name: 'Region',
                    value: region

                },
                {

                    name: 'Members',
                    value: memberCount

                },
                {

                    name: 'Owner',
                    value: owner.user.tag,

                }

            )

        message.channel.send(embed)
 
    })

    command(client , 'ban' , (message) => {

        const { member , mentions} = message

        const tag = `<@${member.id}>`

        if(member.hasPermission('BAN_MEMBERS')){

            const target = mentions.users.first()

            if(target){

                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()

                message.reply(`${target} has been banned`)

            } else{

                message.reply('Please specify someone to ban.')

            }

        } else{

            message.reply('You do not have the permission to use this command.')

        }

    })

    command(client , 'kick' , (message) => {

        const { member , mentions} = message

        const tag = `<@${member.id}>`

        if(member.hasPermission('KICK_MEMBERS')){

            const target = mentions.users.first()

            if(target){

                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()

                message.reply(`${target} has been kicked`)

            } else{

                message.reply('Please specify someone to kick.')

            }

        } else{

            message.reply('You do not have the permission to use this command.')

        }

    })

    const { prefix } = config

    client.user.setPresence({

        activity: {

            name: `"${prefix}help" for help!`,

        },
    })

})

client.login(config.TOKEN)