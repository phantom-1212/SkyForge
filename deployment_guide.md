# SkyForge Deployment Guide

This guide details how to deploy the **SkyForge** platform to production.

## 1. Prerequisites
- A GitHub repository containing the latest code.
- A [Render](https://render.com) account (for the backend).
- A [Vercel](https://vercel.com) account (for the frontend).
- A [RapidAPI](https://rapidapi.com/judge0/api/judge0-ce) account for the Judge0 API key.

## 2. Backend Deployment (Render)

1. **Create a New Blueprint Instance**:
   - Go to the Render Dashboard and click **New > Blueprint**.
   - Connect your GitHub repository.
   - Render will automatically detect the `render.yaml` file.
   - Click **Apply**.

2. **Configure Environment Variables**:
   - In the Render Dashboard, go to your `skyforge-server` service settings.
   - Set the following environment variables:
     - `JUDGE0_API_KEY`: Your RapidAPI key for Judge0.
     - `FRONTEND_URL`: Your Vercel deployment URL (e.g., `https://skyforge.vercel.app`).
     - `JUDGE0_HOST`: `https://judge0-ce.p.rapidapi.com` (already set in `render.yaml`).

## 3. Frontend Deployment (Vercel)

1. **Import Repository**:
   - Go to the Vercel Dashboard and click **New Project**.
   - Import your GitHub repository.

2. **Configure Environment Variables**:
   - In the "Environment Variables" section of the project setup, add:
     - `NEXT_PUBLIC_API_URL`: The URL of your Render backend (e.g., `https://skyforge-server.onrender.com`).

3. **Deploy**:
   - Click **Deploy**. Vercel will build and host your Next.js application.

## 4. Final Verification
- Once both are deployed, open your Vercel URL.
- Go to the **Editor** and try running a simple "Hello World" in Python.
- If it works, the Piston/Judge0 cloud fallback is correctly communicating with your backend!
