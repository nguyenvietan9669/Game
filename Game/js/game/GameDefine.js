class GameDefine {
	constructor() {
		//DEBUG
		this.IS_DEBUG = false;
		this.IS_SKIP_TUTORIAL = false;
		//TIME
		this.GAME_TIMEOUT 		= (!!window.isOutfit7 ? 25 : 30);
		this.GAME_TIMER_WARNING = 5;
		this.IS_WIDTHER_DEVICE 	= !!window.isOutfit7 ? this.GetRatio() >= 1.95 : this.GetRatio() >= 2;

		this.APPW = APP.GetWidth();
		this.APPH = APP.GetHeight();
		this.FRENZY_BAR_POS = { x: 20, y: 20 };

		//SCORE
		this.SCORE_ITEM = 10;
		this.SCORE_OBSTACLE = -30;

		this.SCORE_FRENZY_ITEM = 20;
		this.SCORE_FRENZY_OBSTACLE = 0;

		//FRENZY
		this.FRENZY_SCORE_MAX = 50;
		this.FRENZY_LONG_TIME = 5;

		//WIND
		this.WIND_DISTANCE_MAKE_WIND = 20000;
		this.WIND_SIZE_LENGTH = 2500;
		this.WIND_SIZE_HEIGHT = 20;
		this.WIND_ARR_COLOR = [
			0x00dbda,
			0xc2ffff
		];

		this.WIND_ALPHA = 0.4;
		this.WIND_SPEED_Z = -8000;

		//PLAYER
		this.IMMORTAL_LONG_TIME = 1;

		//SCORE_TEXTURE
		//for plus score in normal
		this.SCORE_TEXTURE_ARR_NUMBER_ID_STYLE_01 = [
			SPRITE_GAME_FRAME_0,
			SPRITE_GAME_FRAME_1,
			SPRITE_GAME_FRAME_2,
			SPRITE_GAME_FRAME_3,
			SPRITE_GAME_FRAME_4,
			SPRITE_GAME_FRAME_5,
			SPRITE_GAME_FRAME_6,
			SPRITE_GAME_FRAME_7,
			SPRITE_GAME_FRAME_8,
			SPRITE_GAME_FRAME_9,

			SPRITE_GAME_FRAME_PLUS,
			SPRITE_GAME_FRAME_MINUS,
		];
		//for minus score
		this.SCORE_TEXTURE_ARR_NUMBER_ID_STYLE_02 = [
			SPRITE_GAME_FRAME_RED_0,
			SPRITE_GAME_FRAME_RED_1,
			SPRITE_GAME_FRAME_RED_2,
			SPRITE_GAME_FRAME_RED_3,
			SPRITE_GAME_FRAME_RED_4,
			SPRITE_GAME_FRAME_RED_5,
			SPRITE_GAME_FRAME_RED_6,
			SPRITE_GAME_FRAME_RED_7,
			SPRITE_GAME_FRAME_RED_8,
			SPRITE_GAME_FRAME_RED_9,

			SPRITE_GAME_FRAME_PLUS,
			SPRITE_GAME_FRAME_MINUS,
		];
		//for plus score in frenzy
		this.SCORE_TEXTURE_ARR_NUMBER_ID_STYLE_03 = [
			SPRITE_GAME_FRAME_0_FRENZY,
			SPRITE_GAME_FRAME_1_FRENZY,
			SPRITE_GAME_FRAME_2_FRENZY,
			SPRITE_GAME_FRAME_3_FRENZY,
			SPRITE_GAME_FRAME_4_FRENZY,
			SPRITE_GAME_FRAME_5_FRENZY,
			SPRITE_GAME_FRAME_6_FRENZY,
			SPRITE_GAME_FRAME_7_FRENZY,
			SPRITE_GAME_FRAME_8_FRENZY,
			SPRITE_GAME_FRAME_9_FRENZY,

			SPRITE_GAME_FRAME_PLUS_FRENZY,
			SPRITE_GAME_FRAME_MINUS,
		];

		//--------------------------
		this.UpdateParams();

		if(!!window.isOutfit7) TrackingManager.GetSourceGameGGI = GameConfig._OverrideGetSourceGameGGI;		

		if(window.DEBUG){
			// // Cheat for debug mode
			// this.GAME_TIMEOUT 			= 15;
			// this.IS_DEBUG = true;
			// window.isOutfit7 = false;
			// window._show_touchzone 		= true;
		}
	}

	GetRatio()
	{
		let sw = window.innerWidth;
		let sh = window.innerHeight;

		let ratio = Math.max(sw, sh) / Math.min(sw, sh);

		return ratio;
	}

	UpdateParams() {
		//VIDEO
		this.VIDEO_SPEED = 1.09;
		this.VIDEO_SPEED_FRENZY = 1.4 * this.VIDEO_SPEED;

		//LANE
		this.LANE_WIDTH = 350;	//khoang cach x giua 2 item chung row
		this.NUMBER_OF_LANE = 3;

		this.LANE_X_MAX = ((this.NUMBER_OF_LANE - 1) / 2) * this.LANE_WIDTH;
		this.LANE_X_MIN = -this.LANE_X_MAX;

		//LEVEL
		this.LEVEL_ROW_DISTANCE = 800;	//khoang cach giua 2 row

		//CAMERA
		this.CAMERA_POSITION_ON_SCREEN = { x: 0.5 * APP.GetWidth(), y: 0.5 * APP.GetHeight() };
		this.CAMERA_START_POSITION = {
			x: 0,
			y: -500,
			z: -1000,
		};
		this.CAMERA_OFFSET_POSITION_WITH_PLAYER = {
			x: undefined,
			y: undefined,
			z: this.IS_WIDTHER_DEVICE ? -1250 : -1100
		};
		this.CAMERA_Z_SCALE_ORIGIN = 1000;

		//SPEED
		this.ACCELE_Y = 4000;
		this.ACCELE_Y_FRENZY = 4000;

		//PLAYER
		this.PLAYER_START_POSITION = {
			x: (this.NUMBER_OF_LANE % 2 == 0 ? -0.5 : 0) * this.LANE_WIDTH,
			y: 0, z: 0
		};

		this.PLAYER_SPEED_Z = 2200;
		this.PLAYER_SPEED_X = 1000;
		this.PLAYER_SPEED_Y = -1200;

		this.PLAYER_SPEED_Z_FRENZY = 2.4 * this.PLAYER_SPEED_Z;
		this.PLAYER_SPEED_X_FRENZY = 2 * this.PLAYER_SPEED_X;
		this.PLAYER_SPEED_Y_FRENZY = 1 * this.PLAYER_SPEED_Y;

		//OBJECT_MGR
		this.OBJECT_MGR_START_Z = 5 * this.LEVEL_ROW_DISTANCE;
		this.OBJECT_MGR_OFFSET_Z_WITH_PLAYER = 10 * this.LEVEL_ROW_DISTANCE; //khoang cach tao item truoc player
	}

	CheckCollisionTwoRange(v11, v12, v21, v22) {
		return !(
			Math.max(v11, v12) < Math.min(v21, v22)
			|| Math.min(v11, v12) > Math.max(v21, v22)
		);
	}

	CheckCollisionTwoBody(body1, body2) {
		return (
			this.CheckCollisionTwoRange(body1.x, body1.x + body1.width, body2.x, body2.x + body2.width)
			&& this.CheckCollisionTwoRange(body1.y, body1.y + body1.height, body2.y, body2.y + body2.height)
			&& this.CheckCollisionTwoRange(body1.z, body1.z + body1.depth, body2.z, body2.z + body2.depth)
		);
	}

	UpdateRotateVideo() {
		this.mVideoBg.className = (window.innerWidth < window.innerHeight) ? 'video_no_rotate' : 'video_rotate';
		this.mVideoFrenzy.className = (window.innerWidth < window.innerHeight) ? 'video_no_rotate' : 'video_rotate';
	}

	IsSingleTouch(event) {
		if (event.data.pointerType == "touch") {
			if (
				(
					event.data.originalEvent.type == 'touchstart'
					&& event.data.originalEvent.touches.length == 1
				)
				|| (
					event.data.originalEvent.type == 'touchmove'
					&& event.data.originalEvent.touches.length == 1
				)
				|| (
					event.data.originalEvent.type == 'touchend'
					&& event.data.originalEvent.touches.length == 0
				)
			) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return true;
		}
	}

	GetDistance(p1, p2) {
		let dx = p2.x - p1.x;
		let dy = p2.y - p1.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	MoveToTarget(value, valueTarget, speed, dt) {
		speed = Math.abs(speed);
		return (value < valueTarget) ? (Math.min(value + speed * dt, valueTarget)) : ((value > valueTarget) ? (Math.max(value - speed * dt, valueTarget)) : (value));
	}

	GetAngle(p1, p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;

		if (dx < 0) {
			if (dy < 0) { return Math.atan(dy / dx) / Math.PI * 180 + 180; }
			else if (dy == 0) { return 180; }
			else { return Math.atan(dy / dx) / Math.PI * 180 + 180; }
		}
		else if (dx == 0) {
			if (dy < 0) { return -90; }
			else if (dy == 0) { return 0; }
			else { return 90; }
		}
		else //dx > 0
		{
			if (dy < 0) { return Math.atan(dy / dx) / Math.PI * 180; }
			else if (dy == 0) { return 0; }
			else { return Math.atan(dy / dx) / Math.PI * 180; }
		}
	}

	CheckValueInRange(value, value1, value2) {
		return value >= Math.min(value1, value2) && value <= Math.max(value1, value2);
	}

	LinearInterpolation(x, x1, x2, y1, y2) {
		return (x - x1) / (x2 - x1) * (y2 - y1) + y1;
	}


	GetValueInArray(percent, arr) {
		if (arr.length >= 2) {
			let length = arr.length - 1;
			for (let i = 0; i < length; i++) {
				if (this.CheckValueInRange(percent, arr[i][0], arr[i + 1][0])) {
					return this.LinearInterpolation(percent, arr[i][0], arr[i + 1][0], arr[i][1], arr[i + 1][1]);
				}
			}
		}
		return 0;
	}

	GetRandomInRange(value1, value2) {
		return value1 + (value2 - value1) * Math.random();
	}

	IsWindowVersion() {
		// if (window.isWindowVersion) {
		// 	return window.isWindowVersion;
		// }
		// let creative_id_local = window.creative_id;
		// if (window.REVIEW) {
		// 	if (typeof window.userParams !== "undefined") {
		// 		creative_id_local = window.userParams.creative_id;
		// 	}
		// }

		// if (creative_id_local) {
		// 	let listCreatives = Resource.GetParam("windows_id");
		// 	if (listCreatives.indexOf(creative_id_local) != -1) {
		// 		window.isWindowVersion = true;
		// 	}
		// 	else {
		// 		window.isWindowVersion = false;
		// 	}
		// }

		// return window.isWindowVersion;

		return false;
	}

	IsWideScreen() {		
		return this.IS_WIDTHER_DEVICE;
	}

	IsIpadScreen() {
		let ratio = APP.GetHeight() > APP.GetWidth() ? APP.GetHeight() / APP.GetWidth() : APP.GetWidth() / APP.GetHeight();
        let normalizedRatio = Math.round((ratio) * 100) / 100;
        if (normalizedRatio <= 4/3) {
			return true;
		}
		
		return false;
	}
}
module.exports = new GameDefine();