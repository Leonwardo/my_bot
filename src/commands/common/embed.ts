import {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
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
        name: "emded_criar",
        description: "Comando para fazer o seu proprio embed",
        type: ApplicationCommandType.ChatInput,
        async run({ interaction, options }){

            const modal_embed = new ModalBuilder({
                customId: "embed",
                title: "Embed",
            })

            const input = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        custom_id: "titulo",
                        label: "Titulo",
                        placeholder: "Digite o titulo do embed",
                        style: TextInputStyle.Short,
                    })
                ]
            })

            const input2 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        custom_id: "descricao",
                        label: "Descrição",
                        placeholder: "Digite a descrição do embed",
                        style: TextInputStyle.Paragraph,
                        required: true,
                    })
                ]
            })
            const input3 = new ActionRowBuilder<TextInputBuilder>({
                components: [
                    new TextInputBuilder({
                        custom_id: "footer",
                        label: "Footer",
                        placeholder: "Digite o footer do embed",
                        style: TextInputStyle.Paragraph,
                        required: true,
                    })
                ]
            })

            modal_embed.addComponents(input, input2, input3);
  
            await interaction.showModal(modal_embed);
    
            const modalInteraction = await interaction
              .awaitModalSubmit({
                time: 60000,
                filter: (i) => i.user.id === interaction.user.id,
              })
              .catch(() => null);
    
            if (!modalInteraction) return;
    
            const { fields } = modalInteraction;

            const titulo_embed = fields.getTextInputValue("titulo");
            const descricao_embed = fields.getTextInputValue("descricao");
            const footer_embed = fields.getTextInputValue("footer");
            
            if (!interaction.inCachedGuild()) return;
            const { guild, member } = interaction;
            const { members: memberManager } = guild;

            const embed_per = new EmbedBuilder({
                author: {
                    name: "Fortal City",
                    iconURL: "https://cdn.discordapp.com/attachments/1166067939544404048/1166110546861502474/GIF.gif?ex=65494c13&is=6536d713&hm=dc6ac1286c1d69a1265aa901ed78239a3cbb5cf60544ed8f1710f1bfb59be179&",
                },
                title: titulo_embed,
                description: descricao_embed,
                footer: {text: footer_embed},
                color: 0x2b2d31,
            })

            const channel_embed = interaction.channel as TextChannel;  // canal de encomendas // canal de log
  

            channel_embed.send({ embeds: [embed_per] });

            const embed_log_embed = new EmbedBuilder({
                title: "Embed",
                description: `O usuario ${member} criou um embed na sala ${channel_embed}`,
                color: 0x2b2d31,
            })

            const channel_log = guild.channels.cache.get(
                "1165472355003420763"
                ) as TextChannel;
            channel_log.send({ embeds: [embed_log_embed]});
            modalInteraction.reply({ content: "Embed criado com sucesso!", ephemeral: true });

        }
    })
