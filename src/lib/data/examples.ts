import { ExampleMessage } from "../types";

export const EXAMPLE_MESSAGES: ExampleMessage[] = [
  {
    id: "bank-otp-scam",
    title: "Bank Support OTP Request",
    channel: "SMS",
    senderDisplay: "Alert-Desk (+60 11-5550 0194)",
    tag: "Banking OTP",
    message:
      "Hello, I am from the official Fraud Prevention Team at Horizon Bank. We flagged an unauthorized wire transfer of $1,480.00 on your card. Your online banking will be suspended within 15 minutes unless cancelled. Please provide your 6-digit OTP sent to your phone immediately or click this link to verify: https://horizon-secure-verify.example.com/cancel",
  },
  {
    id: "delivery-fee-scam",
    title: "Parcel Redelivery Payment",
    channel: "SMS",
    senderDisplay: "ExpressPost-Notice",
    tag: "Delivery Fee",
    message:
      "ExpressPost Customs Notice: Your package held at customs due to an incomplete street label. Your parcel will be returned within 12 hours unless you pay a small redelivery fee of $1.95. Tap the link below to confirm your address and settle the charge: https://expresspost-track-pay.example.com/parcel",
  },
  {
    id: "account-suspension",
    title: "Urgent Account Suspension",
    channel: "Email",
    senderDisplay: "security-notice@cloudworkspace-alert.example",
    tag: "Account Threat",
    message:
      "Official Security Notice: Unusual sign-in detected from an unrecognized device. Immediate action required: your account will be permanently locked in 30 minutes to protect your data. Click this link to verify your login credentials right away: https://account-auth-restore.example.com/login",
  },
  {
    id: "job-recruitment",
    title: "Remote Job Recruitment",
    channel: "WhatsApp",
    senderDisplay: "+44 7700 900412",
    tag: "Job Scam",
    message:
      "Hi! I am contacting you from the HR Recruitment team for a flexible remote rating role paying $250 to $400 daily. Final onboarding slots close in 2 hours. Please message our coordinator on Telegram @CareerFastTrack_Example and pay a refundable training deposit of $35 to unlock your task workspace.",
  },
  {
    id: "routine-support-note",
    title: "Routine Support Update",
    channel: "Email",
    senderDisplay: "support@northstar-books.example.com",
    tag: "No Obvious Signs",
    message:
      "Hi Alex, thanks for reaching out to Northstar Books yesterday regarding order #NB-40912. Your replacement paperback has been packed and will ship with standard ground service on Tuesday. No action is needed from you, and you can view order notes anytime by logging into your Northstar Books account as usual.",
  },
];
