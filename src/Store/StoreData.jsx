import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useStore = create(
	persist(
		(set) => ({
			idUsuario: null,
			Usuario: null,
			Correo: null,
			isDrawerOpen: false,
			isAuth: false,

			setIdusuario: (newIdUsuario) => set({ idUsuario: newIdUsuario }),
			setUsuario: (newUsuario) => set({ Usuario: newUsuario }),
			setCorreo: (newCorreo) => set({ Correo: newCorreo }),
			setisDrawerOpen: (newOpen) => set({ isDrawerOpen: newOpen }),
			setAuth: (newisAuth) => set({ isAuth: newisAuth }),
		}),
		{
			name: 'userData',
		},
	),
);
