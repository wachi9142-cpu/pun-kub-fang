import type { Metadata, Viewport } from "next";
import { Prompt, Mitr } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const mitr = Mitr({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mitr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ปั่นกับฟ่าง · Smoothie & Drinks | ปั่นสด อร่อยทุกแก้ว",
  description:
    "ปั่นกับฟ่าง ร้านน้ำปั่นผลไม้สด สมูทตี้ นมสด โกโก้ มัทฉะ ปั่นสดใหม่ทุกแก้ว คัดสรรวัตถุดิบคุณภาพ ไม่ใส่วัตถุกันเสีย สั่งเลยวันนี้!",
  keywords: ["น้ำปั่น", "สมูทตี้", "ปั่นกับฟ่าง", "smoothie", "ผลไม้ปั่น", "นมสด"],
};

export const viewport: Viewport = {
  themeColor: "#7b4ab8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${prompt.variable} ${mitr.variable}`}>
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#7b4ab8",
                colorInfo: "#5aafe0",
                borderRadius: 16,
                fontFamily: "var(--font-prompt), system-ui, sans-serif",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
