module.exports = (client) => {

    const isInvite = async(guild , code) => {

        return await new Promise((resolve) => {

            guild.fetchInvites().then((invites) => {

                for(const invite of invites){

                    if(code === invites[0]){

                        resolve(true)
                        return

                    }

                }

                resolve(false)

            })

        })

    }

    client.on('message' , async(message) => {

        const { guild  , member , content } = message

        // https://discord.gg/ZthPXyDGrx

        const code = content.split('discord.gg/')[1]
        console.log('CODE:' , code);

        if(content.includes('discord.gg/')){

            const isOurInvite = await isInvite(guild , code)

            if(!isOurInvite){

                // We know that they are advertising an outside discord server

            }
        
        }

    })

}