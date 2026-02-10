import { useState, useEffect } from "react";
import { ALL_ASSETS } from "../../ALL_ASSETS";

import { MdOutlineWifiOff } from "react-icons/md";
import { MdOutlineWifi } from "react-icons/md";

export default function BottomBar({
  pageIndex,
}) {
  const [pageInput, setPageInput] = useState("");

  useEffect(() => {
    setPageInput("");
  }, [pageIndex]);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [offlineReady, setOfflineReady] = useState(
    localStorage.getItem("offline-ready") === "true",
  );
  useEffect(() => {
    const onMessage = (event) => {
      if (event.data?.type === "PRELOAD_PROGRESS") {
        const { loaded, total } = event.data;
        setProgress(Math.round((loaded / total) * 100));
      }

      if (event.data?.type === "PRELOAD_DONE") {
        setDownloading(false);
        setOfflineReady(true);
        localStorage.setItem("offline-ready", "true");
      }
    };

    navigator.serviceWorker?.addEventListener("message", onMessage);

    return () =>
      navigator.serviceWorker?.removeEventListener("message", onMessage);
  }, []);

  const startOfflineDownload = () => {
    if (!navigator.serviceWorker?.controller) {
      alert("يرجى إعادة تحميل الصفحة أولًا");
      return;
    }

    setDownloading(true);

    navigator.serviceWorker.controller.postMessage({
      type: "PRELOAD_ALL",
      assets: ALL_ASSETS,
    });
  };

  return (
    <>
      {/* 📥 OFFLINE DOWNLOAD */}
      {!offlineReady && !downloading && (
        <button
          onClick={startOfflineDownload}
          className="flex items-center justify-center px-2 py-1
               text-[#430f68] hover:bg-[#f6f0ff]
               rounded-lg transition"
          title="تحميل الكتاب للاستخدام بدون إنترنت"
        >
          <MdOutlineWifiOff size={22} />
        </button>
      )}

      {downloading && (
        <div
          className="flex items-center gap-1 px-2 py-1
               text-[#430f68] text-xs"
          title="جاري تحميل الكتاب"
        >
          <MdOutlineWifiOff size={22} className="animate-pulse" />
          <span>{progress}%</span>
        </div>
      )}

      {offlineReady && (
        <div
          className="flex items-center justify-center px-2 py-1 rounded-lg
               bg-green-100 text-green-700"
          title="الكتاب جاهز بدون إنترنت"
        >
          <MdOutlineWifi size={22} />
        </div>
      )}
    </>
  );
}
