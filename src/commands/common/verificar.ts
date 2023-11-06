import {
    ActionRowBuilder,
    Application,
    ApplicationCommandOptionType,
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
    TextChannel,
    TextInputBuilder,
    TextInputComponent,
    TextInputStyle,
    User,
  } from "discord.js";
  import { Command } from "../../structs/types/Command";
import { SqliteDriver } from "quick.db";

    export default new Command({
        name: "setar_verificar",
        description: "Comando para verificar",
        type: ApplicationCommandType.ChatInput,
        async run({ interaction, options }){
            

            const embed_verificar = new EmbedBuilder({
                author: {
                    name: "Fortal City",
                    iconURL: "https://cdn.discordapp.com/attachments/1166067939544404048/1166110546861502474/GIF.gif?ex=65494c13&is=6536d713&hm=dc6ac1286c1d69a1265aa901ed78239a3cbb5cf60544ed8f1710f1bfb59be179&",
                },
                title: "Verificação",
                description: `Para verificar a sua conta , clique no botão abaixo`,
                color: 0x2b2d31,
                footer: {text: "❗Sem verifição não tera acesso ao servidor"},
            })

            const button_verificar = new ActionRowBuilder<ButtonBuilder>({
                components: [
                  new ButtonBuilder({
                    customId: "btn_verificar",
                    label: "Verificar",
                    emoji: "✅",
                    style: ButtonStyle.Secondary,
                  }),
                ],
              });


            if (!interaction.inCachedGuild()) return;
            const { guild} = interaction;

            const channel_verificar = guild.channels.cache.get(
                "1165389419872780429"
              ) as TextChannel;
            channel_verificar.send({ embeds: [embed_verificar], components: [button_verificar] });
            
        },
        buttons: new Collection([
            [
                "btn_verificar",
                async (interaction) => {

                    if (!interaction.inCachedGuild()) return;
                    const { guild, member } = interaction;
                    const { members: memberManager } = guild;

                    member.roles.remove("1165394231624470569");
                    member.roles.add("1165396736215363645");
                    member.roles.add("1165396833539993690");

                    const embed_log_vr = new EmbedBuilder({
                        title: "Verificação",
                        description: `O usuario ${member} foi verificado`,
                        color: 0x2b2d31,
                    })
                  
                    if (!interaction.inCachedGuild()) return;
            
                const channel_log_vr = guild.channels.cache.get(
                "1165472355003420763"
                ) as TextChannel;
                channel_log_vr.send({ embeds: [embed_log_vr]});
                interaction.reply({ content: "Verificado com sucesso", ephemeral: true });
                }
            ]
        ])
    
    })