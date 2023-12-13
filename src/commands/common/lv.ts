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
        name: "ative_lv",
        description: "Comando para ativar o sistema de LV",
        type: ApplicationCommandType.ChatInput,
        async run({ interaction, options }){

            const embed_at_lv = new EmbedBuilder({
                title: "**BEM VINDO AO CANAL DE LV**",
                description: "Este canal esta dedicado a **ASTRID** , se esta pessoa esta vendo este canal, significa que estas a procura do teu **LOVE**, estas no lugar certo, para encontrar o teu **LOVE**, basta clicar no botão abaixo e seguir as instruções",
                footer: {text: "Click no botão abaixo para encontrar o seu LV"},
                color: 0x2b2d31,
            })

            const button_lv = new ActionRowBuilder<ButtonBuilder>({
                  components: [
                    new ButtonBuilder({
                        customId: "encontrar_lv",
                        label: "Encontrar seu Love",
                        emoji: "❤️",
                        style: ButtonStyle.Secondary,
                    })
                  ]
            })
            if (!interaction.inCachedGuild()) return;
            const { guild} = interaction;

            const channel_lv = guild.channels.cache.get(
                "1172295266272018452"
              ) as TextChannel;

            channel_lv.send({ embeds: [embed_at_lv], components: [button_lv] });
            
          },

          buttons: new Collection([
            

          ])

    })