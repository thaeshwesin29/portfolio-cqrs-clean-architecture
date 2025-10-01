import { ref, onMounted, onUnmounted } from "vue";
import { echo } from "@/plugins/echo";
import { getUnreadContactMessages } from "@/api/queries/contactMessageQuery";
import { updateContactMessage } from "@/api/commands/contactMessageCommand";

export interface Notification {
  id: string;
  name?: string;
  status?: boolean; // true = read
  action: string;
  model: string;
}

export function useNotifications(model: string) {
  const notifications = ref<Notification[]>([]);
  const unreadCount = ref(0);
  let channel: any = null;
  const channelName = `model-changed-${model}`;

  function normalizeEvent(event: any): Notification {
    const data = event?.payload ? event : { payload: event };
    const p = data.payload ?? {};
    return {
      id: String(data.id ?? p.id ?? Date.now()),
      name: p.name ?? p.title ?? p.message ?? "No name",
      status: p.is_read ?? false,
      action: data.action ?? p.action ?? "update",
      model: data.model ?? model,
    };
  }

  function addNotification(rawEvent: any) {
    const n = normalizeEvent(rawEvent);

    // Check if it already exists
    const idx = notifications.value.findIndex(x => x.id === n.id);
    if (idx !== -1) {
      // update existing
      notifications.value[idx] = { ...notifications.value[idx], ...n };
    } else {
      // add new
      notifications.value.unshift(n);
      if (!n.status) unreadCount.value++;
    }
  }

  async function markAsRead(id?: string) {
    if (id) {
      const idx = notifications.value.findIndex(n => n.id === id);
      if (idx !== -1 && !notifications.value[idx].status) {
        notifications.value[idx].status = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
        try {
          await updateContactMessage(Number(id), { is_read: true });
        } catch (err) {
          console.error(`[useNotifications] Failed to mark ${id} as read`, err);
          notifications.value[idx].status = false;
          unreadCount.value++;
        }
      }
    } else {
      const unread = notifications.value.filter(n => !n.status);
      notifications.value.forEach(n => (n.status = true));
      unreadCount.value = 0;
      try {
        await Promise.all(unread.map(n => updateContactMessage(Number(n.id), { is_read: true })));
      } catch (err) {
        console.error("[useNotifications] Failed to mark all as read", err);
        unread.forEach(n => (n.status = false));
        unreadCount.value = notifications.value.filter(n => !n.status).length;
      }
    }
  }

  async function fetchUnreadNotifications() {
    try {
      const messages = await getUnreadContactMessages();
      notifications.value = messages.map(msg => ({
        id: String(msg.id),
        name: msg.name,
        status: msg.is_read ?? false,
        action: "create",
        model,
      }));
      unreadCount.value = notifications.value.filter(n => !n.status).length;
    } catch (err) {
      console.error("[useNotifications] Fetch unread failed", err);
    }
  }

  onMounted(() => {
    fetchUnreadNotifications();
    channel = echo.channel(channelName);
    channel.listen(".model.changed", addNotification);
    channel.listen("model.changed", addNotification);
  });

  onUnmounted(() => {
    if (channel) {
      try {
        channel.stopListening?.(".model.changed");
        channel.stopListening?.("model.changed");
        echo.leave?.(channelName);
      } catch {}
      channel = null;
    }
  });

  return { notifications, unreadCount, markAsRead };
}
