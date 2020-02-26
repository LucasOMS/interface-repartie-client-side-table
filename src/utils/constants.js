/* SOCKET.IO message Types */
export const REGISTRATION_ASK = 'REGISTRATION_ASK';
export const REGISTER_DEVICE = 'REGISTER_DEVICE';
export const DEVICE_CONNECTED = 'DEVICE_CONNECTED';
export const DEVICE_DISCONNECTED = 'DEVICE_DISCONNECTED';
export const EXPLORE_PLACE = 'EXPLORE_PLACE';
export const CLUE_FOUND = 'CLUE_FOUND';
export const END_TALK = 'END_TALK';
export const END_GAME = 'END_GAME';
/* devices icons */
export const TABLE_IMAGE_SRC_PATH = 'assets/devices/table.png';
export const TABLET_IMAGE_SRC_PATH = 'assets/devices/tablet.png';
export const VR_IMAGE_SRC_PATH = 'assets/devices/vr.png';
/* utils */
export const HOME_BACKGROUND_IMG = 'assets/utils/home-background.png';
export const GAME_BACKGROUND_IMG = 'assets/utils/game-background.png';
export const GAME_BACKGROUND_IMG_NO_TRANSPARENT = 'assets/utils/game-background-no-transparent.png';
export const JOURNAL_IMG = 'assets/utils/journal.png';
export const REVERSE_JOURNAL_IMG = 'assets/utils/journal-reverse.png';
export const SYMBOLS_IMG = 'assets/utils/symbols.png';
export const REVERSE_SYMBOLS_IMG = 'assets/utils/symbols-reverse.png';
export const EXCLAM_IMG = 'assets/utils/exclam.png';
export const QUESTION_IMG = 'assets/utils/question.png';
/* buttons */
export const PLAY_IMAGE_SRC_PATH = 'assets/buttons/play.png';
export const LAUNCH_BUTTON_IMG = 'assets/buttons/launch-button.png';
/* clues */
export const NOTE_IMG = 'assets/clues/note.png';
export const CLUE_BALLON_IMG = 'assets/clues/ballon.png';
export const CLUE_SHOES_IMG = 'assets/clues/shoe.svg';
/* places */
export const STADIUM_IMG = 'assets/places/stadium.png';
export const WAREHOUSE_IMG = 'assets/places/building.svg';
export const LOCKER_ROOM_IMG = 'assets/places/locker-room.svg';
export const LOCKER_ROOM_LOCKERS_IMG = 'assets/places/locker-room-lockers.svg';
/* characters */
export const SUPPORTER_IMG = 'assets/characters/supporter.svg';
export const SCIENTIST_IMG = 'assets/characters/scientist.png';
export const REFEREE_IMG = 'assets/characters/referee.svg';
export const REFEREE_AFTER_IMG = 'assets/characters/referee_after.svg';
export const REFEREE_END_IMG = 'assets/characters/referee_end.png';
/* dialogs */
export const DIALOG_BALL_IMG = 'assets/dialogs/expert_on_ball.png';
export const DIALOG_SHOES_IMG = 'assets/dialogs/expert_on_shoes.png';
export const DIALOG_EXPERT_IMG = 'assets/dialogs/expert_beginning.png';
export const DIALOG_SUPPORTER_1_IMG = 'assets/dialogs/supporter1.png';
export const DIALOG_SUPPORTER_2_IMG = 'assets/dialogs/supporter2.png';
export const DIALOG_SUPPORTER_3_IMG = 'assets/dialogs/supporter3.png';
export const DIALOG_SUPPORTER_4_IMG = 'assets/dialogs/supporter4.png';
export const DIALOG_SUPPORTER_5_IMG = 'assets/dialogs/supporter5.png';
export const DIALOG_SUPPORTER_6_IMG = 'assets/dialogs/supporter6.png';
/* audios */
export const AUDIO_1 = 'assets/sounds/vocal1.mp3';
export const AUDIO_2 = 'assets/sounds/vocal2.mp3';
export const AUDIO_3 = 'assets/sounds/vocal3.mp3';
export const SUPPORTER_AUDIO_1 = 'assets/sounds/supporter_1.mp3';
export const SUPPORTER_AUDIO_2 = 'assets/sounds/supporter_2.mp3';
export const SUPPORTER_AUDIO_3 = 'assets/sounds/supporter_3.mp3';
export const SUPPORTER_AUDIO_4 = 'assets/sounds/supporter_4.mp3';
export const SUPPORTER_AUDIO_5 = 'assets/sounds/supporter_5.mp3';
export const SUPPORTER_AUDIO_6 = 'assets/sounds/supporter_6.mp3';
/* disconnect */
export const VR_DISCONNECTED_IMG = 'assets/devices/disconnected/vr_disconnected.png';
export const TABLET_DISCONNECTED_IMG = 'assets/devices/disconnected/tablet_disconnected.png';
/* instructions */
export const TAKE_VR_IMG = 'assets/devices/take_vr.png';
export const TAKE_TABLET_IMG = 'assets/devices/take_tablet.png';
export const TAKE_VR_WHITE_IMG = 'assets/devices/take_vr_white.png';
export const TAKE_TABLET_WHITE_IMG = 'assets/devices/take_tablet_white.png';
/* ids */
export const STADIUM_ID = 1;
export const LOCKER_ROOM_ID = 2;
export const LOCKER_ROOM_LOCKERS_ID = 3;
export const CLUE_NOTE_ID = 1;
export const CLUE_BALL_ID = 2;
export const CLUE_SHOES_ID = 3;
export const SCIENTIST_DROP_ZONE_NAME = 'SCIENTIST';

// Utils
export const PROFILES = {
  LOCAL: 'LOCAL',
  PROD: 'PROD',
};

// Network consts
const NETWORK_PROFILES = {
  LOCAL: 'LOCAL',
  PROD: 'PROD',
};
const currentProfile = NETWORK_PROFILES.LOCAL; // Shorthand to change when deploying
const NETWORK_PATH = 'http://192.168.1.5';
const LOCAL_PATH = 'http://localhost';
export const SERVER_REST_ROOT_PATH = `${currentProfile === NETWORK_PROFILES.LOCAL ? LOCAL_PATH : NETWORK_PATH}:4444`;
export const SOCKET_ENDPOINT = `${currentProfile === NETWORK_PROFILES.LOCAL ? LOCAL_PATH : NETWORK_PATH}:10000/`;
