import { Context, Scenes } from "telegraf";

export interface setVideoSceneSession extends Scenes.WizardSessionData {
	levelId: string;
}

export type GDBBContext = Scenes.WizardContext<setVideoSceneSession>;