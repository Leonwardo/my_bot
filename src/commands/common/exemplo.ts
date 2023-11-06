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
        name: "",
        description: "",
        type: ApplicationCommandType.ChatInput,
        async run({ interaction, options }){

            
        }
    })