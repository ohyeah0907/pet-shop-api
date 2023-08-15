import { Router } from "express";
import home from "./home";
import auth from "./auth";
import user from "./user";
import cloud from "./cloud";
import homeCloud from "./home_cloud";
import room from "./room";
import session from "./session";
import filter from "./filter";
import camera from "./camera";
import roomCamera from "./room_camera";
import script from "./script";
import userHome from "./user_home";
import actionable from "./actionable";
import preset from "./preset";
import sensor from "./sensor";
import automation from "./automation";
import device from "./device";
import cameraBrand from "./camera_brand";
import roomDevice from "./room_device";
import notification from "./notification";
import tag from "./tag";
import userTag from "./user_tag";
import userNotification from "./user_notification";
import roleSchedule from "./user_schedule";
import scheduleWeek from "./schedule_week";
import scheduleHour from "./schedule_hour";
import roomShortcut from "./room_shortcut";
import haEntity from "./ha_entity";
import file from "./file";
import voiceProject from "./voice_project";
import oauth2 from "./oauth2";
import userFCM from "./user_fcm";

const router = Router();

router.use("/home", home)
router.use("/auth", auth)
router.use("/user", user)
router.use("/cloud", cloud)
router.use("/home-cloud", homeCloud)
router.use("/room", room)
router.use("/session", session)
router.use("/filter", filter)
router.use("/camera", camera)
router.use("/room-camera", roomCamera)
router.use("/script", script)
router.use("/user-home", userHome)
router.use("/actionable", actionable)
router.use("/preset", preset)
router.use("/sensor", sensor)
router.use("/automation", automation)
router.use("/device", device)
router.use("/camera-brand", cameraBrand)
router.use("/room-device", roomDevice)
router.use("/notification", notification)
router.use("/tag", tag)
router.use("/user-tag", userTag)
router.use("/user-notification", userNotification)
router.use("/role-schedule", roleSchedule)
router.use("/schedule-week", scheduleWeek)
router.use("/schedule-hour", scheduleHour)
router.use("/room-shortcut", roomShortcut)
router.use("/ha-entity", haEntity)
router.use("/file", file)
router.use("/voice-project", voiceProject)
router.use("/oauth2", oauth2)
router.use("/user_fcm", userFCM)


export default router;