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
export const TABLE_IMAGE_SRC_PATH = 'assets/table.png';
export const TABLET_IMAGE_SRC_PATH = 'assets/tablet.png';
export const VR_IMAGE_SRC_PATH = 'assets/vr.png';
/* game home */
export const PLAY_IMAGE_SRC_PATH = 'assets/play.png';
export const HOME_BACKGROUND_IMG = 'assets/home-background.png';
export const JOURNAL_IMG = 'assets/journal.png';
export const REVERSE_JOURNAL_IMG = 'assets/journal-reverse.png';
export const SYMBOLS_IMG = 'assets/symbols.png';
export const REVERSE_SYMBOLS_IMG = 'assets/symbols-reverse.png';
export const LAUNCH_BUTTON_IMG = 'assets/launch-button.png';
/* game */
export const GAME_BACKGROUND_IMG = 'assets/game-background.png';
export const STADIUM_IMG = 'assets/stadium.png';
export const NOTE_IMG = 'assets/note.png';
export const REFEREE_IMG = 'assets/referee.png';
export const REFEREE_AFTER_IMG = 'assets/referee_after.png';
export const REFEREE_END_IMG = 'assets/referee_end.png';
export const WAREHOUSE_IMG = 'assets/building.svg';
export const SCIENTIST_IMG = 'assets/scientist.png';
export const LOCKER_ROOM_IMG = 'assets/places/locker-room.svg';
export const LOCKER_ROOM_LOCKERS_IMG = 'assets/places/locker-room-lockers.svg';
export const CLUE_BALLON_IMG = 'assets/clues/ballon.png';
export const CLUE_SHOES_IMG = 'assets/clues/shoe.svg';
export const EXCLAM_IMG = 'assets/exclam.png';
export const QUESTION_IMG = 'assets/question.png';
export const SUPPORTER_IMG = 'assets/supporter.png';
/* dialogs */
export const DIALOG_BALL_IMG = 'assets/dialogs/expert_on_ball.png';
export const DIALOG_SHOES_IMG = 'assets/dialogs/expert_on_shoes.png';
export const DIALOG_EXPERT_IMG = 'assets/dialogs/expert_beginning.png';
/* audios */
export const AUDIO_1 = 'assets/sounds/vocal1.mp3';
export const AUDIO_2 = 'assets/sounds/vocal2.mp3';
export const AUDIO_3 = 'assets/sounds/vocal3.mp3';
/* disconnect */
export const VR_DISCONNECTED_IMG = 'assets/vr_disconnected.png';
export const TABLET_DISCONNECTED_IMG = 'assets/tablet_disconnected.png';
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
const NETWORK_PATH = 'http://192.168.1.9';
const LOCAL_PATH = 'http://localhost';
export const SERVER_REST_ROOT_PATH = `${currentProfile === NETWORK_PROFILES.LOCAL ? LOCAL_PATH : NETWORK_PATH}:4444`;
export const SOCKET_ENDPOINT = `${currentProfile === NETWORK_PROFILES.LOCAL ? LOCAL_PATH : NETWORK_PATH}:10000/`;
