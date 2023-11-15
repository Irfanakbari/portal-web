import '@/app/globals.css'
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import React, {Suspense} from "react";
import Provider from "@/app/context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import Loading from "@/app/(main)/loading";

export const metadata: Metadata = {
  title: 'Portal - Single Sign On',
  // description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
      <Provider session={session} >
        <StyledComponentsRegistry>
            <Suspense fallback={<Loading/>}>
                {
                    children
                }
            </Suspense>
        </StyledComponentsRegistry>
      </Provider>
      </body>
    </html>
  )
}
