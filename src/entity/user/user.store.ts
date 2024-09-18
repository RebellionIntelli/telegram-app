import { create } from "zustand";
import UserEntity from "./user.interface";
import React from "react";

interface UserState {
  user: UserEntity | null;
  setUser: (data: UserEntity) => void;
  hydrate: () => void; // Метод для синхронизации с localStorage
}

const useUserStoreBase = create<UserState>((set) => ({
  user: null,
  setUser: (data: UserEntity) => {
    set({ user: data });
    localStorage.setItem("user", JSON.stringify(data)); // Сохраняем данные в localStorage
  },
  hydrate: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
}));

// Создаем хук, который будет загружать данные из localStorage при инициализации
const useUserStore = () => {
  const userState = useUserStoreBase((state) => state.user);
  const setUserState = useUserStoreBase((state) => state.setUser);
  const hydrate = useUserStoreBase((state) => state.hydrate);

  // Синхронизируем Zustand с localStorage при монтировании компонента
  React.useEffect(() => {
    hydrate();
  }, []);

  return { userState, setUserState };
};

export default useUserStore;
