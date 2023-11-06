import {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChannelType,
    Collection,
    Collector,
    ColorResolvable,
    Component,
    ComponentType,
    Embed,
    EmbedBuilder,
    Guild,
    Integration,
    ModalBuilder,
    ModalSubmitInteraction,
    StringSelectMenuBuilder,
    TextChannel,
    TextInputBuilder,
    TextInputComponent,
    TextInputStyle,
    User,
  } from "discord.js";
  import { Command } from "../../structs/types/Command";
import { SqliteDriver } from "quick.db";

    export default new Command({
        name: "setar_ticket",
        description: "Comando para fazer um ticket",
        type: ApplicationCommandType.ChatInput,
        options: [
            
        ],
        async run({ interaction, options }){

                const embed_ticket = new EmbedBuilder({
                author: {
                    name: "Fortal City",
                    iconURL: "https://cdn.discordapp.com/attachments/1166067939544404048/1166110546861502474/GIF.gif?ex=65494c13&is=6536d713&hm=dc6ac1286c1d69a1265aa901ed78239a3cbb5cf60544ed8f1710f1bfb59be179&",
                },
                title: "Sistema de Ticket Automático",
                description: `Para obter **SUPORTE** abra um ticket clicando o botão a baixo.`,
                footer: {text: "❗Lembre-se não abra um ticket sem necessidade"},
                color: 0x2b2d31,
            })
            const row_ticket = new ActionRowBuilder<StringSelectMenuBuilder>({components: [
                new StringSelectMenuBuilder({
                    customId: "opcao_ticket",
                    placeholder: "Selecione o tipo de ticket",
                    options: [
                        {label: "Suporte", value: "ticket_suporte", description: "Clique aqui para obter suporte", emoji: "🔧"},
                        {label: "Duvida", value: "ticket_duvida", description: "Clique aqui para tirar uma duvida", emoji: "❓"},
                        {label: "Vips e Doações", value: "ticket_doacao", description: "Clique aqui para obter informações sobre doações", emoji: "💰"},
                        {label: "Denuncia", value: "ticket_denuncia", description: "Clique aqui para denunciar um usuario", emoji: "🚨"},
                        {label: "Bugs", value: "ticket_bugs", description: "Clique aqui para reportar um bug", emoji: "🐛"},
                    ]
                })
          ]})


            if (!interaction.inCachedGuild()) return;
            const { guild} = interaction;

            const channel_ticket = guild.channels.cache.get(
                "1165418436994809866"
              ) as TextChannel;

            channel_ticket.send({ embeds: [embed_ticket], components: [row_ticket] });
            
        },
        selects: new Collection([
            ["opcao_ticket", async (selectInteraction) => {
                const { user } = selectInteraction;
  
                const value = selectInteraction.values[0];
  
  
                switch(value){
                    case "ticket_suporte":{

                        if(!selectInteraction.inCachedGuild()) return;
                        const { guild, member } = selectInteraction;
                        const { members: memberManager } = guild;

                        guild.channels
                        .create({
                          name: `ticket_suporte_${member.user.username}`,
                          type: ChannelType.GuildText,
                          topic: `Ticket de suporte do usuario ${member}`,
                          parent: "1165302425440223303",
                          permissionOverwrites: [
                            {
                              id: member.id,
                              allow: ["ViewChannel"], //Cargo da pessoa
                            },
                            {
                              id: guild.roles.everyone.id,
                              deny: ["ViewChannel"], //Cargo do everyone
                              allow: ["SendMessages"],
                            },
                            {
                              id: "1165392792273563709", //Cargo Administrador
                              allow: ["ViewChannel"],
                            },
                            {
                              id: "1165392790994309240", //Cargo Moderador
                              allow: ["ViewChannel"],
                            },
                            {
                                id: "1165394220715090071", //Cargo Suporte
                                allow: ["ViewChannel"],
                            },
                            {
                                id: "1165394223596576788", //Cargo Staff
                                allow: ["ViewChannel"],
                            },
                          ],
                        })
                        .then((abc: any) => {
                          const embed_ticket_dentro = new EmbedBuilder({
                            author: {
                                name: "Fortal City",
                                iconURL: "https://cdn.discordapp.com/attachments/1166067939544404048/1166110546861502474/GIF.gif?ex=65494c13&is=6536d713&hm=dc6ac1286c1d69a1265aa901ed78239a3cbb5cf60544ed8f1710f1bfb59be179&",
                            },
                            title: "**Gestão de Ticket**",
                            description: `Olá ${member} , seja bem vindo ao seu ticket de suporte , aguarde um membro da staff para lhe atender`,
                            footer: {text: "❗Para fechar o ticket clique no botão abaixo"},
                            color: 0x2b2d31,
                          });

                          const button_fechar_tk = new ActionRowBuilder<ButtonBuilder>({
                            components: [
                              new ButtonBuilder({
                                customId: "btn_fechar",
                                label: "Fechar",
                                emoji: "🔒",
                                style: ButtonStyle.Danger,
                              }),
                            ],
                          });
                          
                          abc.send({ embeds: [embed_ticket_dentro], components: [button_fechar_tk] });
                        })
                        
                        .catch((err) => console.log(err));
                        
                  }
                        
                  if(!selectInteraction.inCachedGuild()) return;
                        const { guild, member } = selectInteraction;
                        const { members: memberManager } = guild;

                        const embed_log_tksup = new EmbedBuilder({
                            title: "Ticket Suporte",
                            description: `O usuario ${member} abriu um ticket de suporte no servidor`,
                            color: 0x2b2d31,
                        })

                        const channel_log = guild.channels.cache.get("1165472355003420763") as TextChannel;
                            channel_log.send({ embeds: [embed_log_tksup]});
                            selectInteraction.reply({content: "Ticket de suporte aberto com sucesso", ephemeral: true})
                    }

                    }
            ]])},      
        )
