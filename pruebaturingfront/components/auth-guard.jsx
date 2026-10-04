"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicPaths = new Set(["/", "/login", "/registro"]);

export default function AuthGuard({ children }) {
	const pathname = usePathname();
	const router = useRouter();
	const [checked, setChecked] = useState(false);
	const isPublicPath = publicPaths.has(pathname);

	useEffect(() => {
		if (isPublicPath) {
			setChecked(true);
			return;
		}

		if (!window.localStorage.getItem("access_token")) {
			router.replace("/login");
			return;
		}

		setChecked(true);
	}, [isPublicPath, router]);

	if (isPublicPath || checked) return children;

	return null;
}