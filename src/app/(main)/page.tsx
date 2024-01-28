"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { FaHandsAslInterpreting } from "react-icons/fa6";
import Divider from "@/app/components/Divider";
import { signOut, useSession } from "next-auth/react";
import dayjs from "dayjs";
import Link from "next/link";
import { BiError, BiPowerOff } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { DeviceInfo } from "@/interface/sessiondata";
import Loading from "@/app/(main)/loading";
import Image from "next/image";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

const initData = [
  {
    id: 'ANSEI_APP',
    icon: '🎥',
    name: 'Ansei Delivery App',
    description: 'Sistem Untuk Delivery Ansei',
    url: 'https://ansei.vuteq.co.id',
    status: 'up'
  },
  {
    id: 'MONITORING_APP',
    icon: '🎵',
    name: 'Server Monitoring',
    description: 'Sistem Monitoring Server',
    url: 'https://monitoring.vuteq.co.id',
    status: 'up'
  },
];

const Portal= () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL; // Ganti dengan URL API yang sesuai
  const REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM; // Ganti dengan realm yang sesuai
  const {data: session } = useSession({
    required: true,
  })
  const axiosAuth = useAxiosAuth();
  const [userAccount, setUserAccount] = useState<UserAccount>()
  const [userApp, setUserApp] = useState<UserAccountApplication[]>([])
  const [userSession, setUserSession] = useState<{
    currentSession: UserAccountSessionDevice,
    allSession: UserAccountSessionDevice[]
  }>({
    currentSession: {
      os: "",
      osVersion: "",
      device: "",
      lastAccess: 0,
      sessions: [],
      mobile: false
    },
    allSession:[]
  })

  const [ipAddress, setIPAddress] = useState('-')



  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))

    axiosAuth.get(`${API_BASE_URL}/realms/${REALM}/account/`).then(r => setUserAccount(r.data));
    axiosAuth.get(`${API_BASE_URL}/realms/${REALM}/account/applications`).then(r=> setUserApp(r.data));
    axiosAuth.get(`${API_BASE_URL}/realms/${REALM}/account/sessions/devices`).then(r=>{
      setUserSession({
        currentSession: r.data.find((r: UserAccountSessionDevice)=> r.current === true) ?? {
          os: "",
          osVersion: "",
          device: "",
          lastAccess: 0,
          sessions: [],
          mobile: false
        },
        allSession: r.data
      })
    });
  }, []);


  return (
    <Suspense fallback={<Loading />}>
      <Layout style={{ minHeight: "100vh" }} className={`flex justify-center items-center`}>
        <Header className={`w-full flex justify-center border-2 border-gray-300 fixed top-0`} style={{ background: "#fff", padding: "0 16px" }}>
          <div className={`w-full lg:w-2/3 flex items-center justify-between`}>
            <div style={{ display: "flex", alignItems: "center" , gap: '10px'}}>
              <Image src="/images/img.png" alt="Logo" width={100} height={50} />
              <h1 className={`hidden md:block text-xl font-semibold`}>Application Portal</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ marginRight: "16px" }}>Welcome, {session?.user?.name ?? '-'}</p>
              <Button onClick={() =>  keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }))}>
               <div className={`flex items-center gap-3 text-red-400`}>
                 <BiPowerOff/>
                 Logout
               </div>
              </Button>
            </div>
          </div>
        </Header>
        <Content className={`w-full lg:w-2/3 flex flex-col p-8 gap-5 mt-14 mb-14`}>
          <div className={`w-full bg-[#fcfff5] p-4 rounded flex text-[#2c662d] gap-2 border border-[#2c662d]`}>
            <div className={`flex justify-center items-center`}>
              <FaHandsAslInterpreting size={40}/>
            </div>
            <div>
              <h3 className={`text-[#1a531b] font-bold text-l`}>Welcome to Vuteq Single Sign On (SSO)</h3>
              <p>SSO (Single Sign-On) adalah sistem login terintegrasi untuk menyederhanakan proses login.</p>
            </div>
          </div>
          <Divider title={'Get Started'}/>
          <Content className={'flex flex-col xl:flex-row gap-5'}>
            <div className={`lg:w-96 w-full flex flex-col gap-5`}>
              <div className={`border border-gray-300 rounded p-4 bg-white shadow-md`}>
                <div className={`font-semibold text-xl pb-2 pl-2`}>
                  <h4 className={'text-lg'}>User Info</h4>
                </div>
                <div className={`bg-gray-300 h-0.5 mb-3`}></div>
                <table className="border-none w-full">
                  <tbody>
                  <tr className={`p-3 border-b border-gray-300`}>
                    <td className="p-2"><strong>🗝‍ Identity</strong></td>
                    <td>{userAccount?.username ?? '-'}</td>
                  </tr>
                  <tr className={`p-3 border-b border-gray-300`}>
                    <td className="p-2"><strong>✉️ Email</strong></td>
                    <td>{userAccount?.email ?? '-'}</td>
                  </tr>
                  <tr className={`p-3 border-b border-gray-300`}>
                    <td className="p-2"><strong>📡 IP Address</strong></td>
                    <td>{
                        ipAddress ?? '-'
                    }</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className={`border border-gray-300 rounded p-4 bg-white shadow-md`}>
                <div className={`font-semibold text-xl pb-2 pl-2`}>
                  <h4 className={'text-lg'}>User Session Info</h4>
                </div>
                <div className={`bg-gray-300 h-0.5 mb-3`}></div>
                <table className="border-none w-full">
                  <tbody>
                  <tr className={`p-3 border-b border-gray-300`}>
                    <td className="p-2"><strong>💻 Device</strong></td>
                    <td>{
                        userSession.currentSession.device
                    }</td>
                  </tr>
                  <tr className={`p-3 border-b border-gray-300`}>
                    <td className="p-2"><strong>❤️ Token Created</strong></td>
                    <td>{
                      userSession.currentSession.sessions.find((r: UserAccountSession) => r.current === true)
                          ? dayjs.unix(userSession.currentSession.sessions.find((r: UserAccountSession) => r.current === true)!.started!).format('DD-MM-YYYY HH:mm:ss')
                          : '-'
                    }</td>
                  </tr>
                  <tr className={`p-3 border-b border-gray-300`}>
                    <td className="p-2"><strong>🔐 Token Expired</strong></td>
                    <td>{
                      userSession.currentSession.sessions.find((r: UserAccountSession) => r.current === true)
                          ? dayjs.unix(userSession.currentSession.sessions.find((r: UserAccountSession) => r.current === true)!.expires!).format('DD-MM-YYYY HH:mm:ss')
                          : '-'
                    }</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <Divider title={'Information'}/>
              <div className={`w-full bg-red-200 flex p-4 gap-4 rounded text-red-400 border border-red-400`}>
                <div className={`flex justify-center items-center text-red-600`}>
                  <BiError size={40}/>
                </div>
                <div>
                  <h3 className={`text-red-600 font-bold text-l`}>Ada Masalah?</h3>
                  <p>Hubungi Administrator</p>
                </div>
              </div>
              <div className={`w-full bg-[#f8ffff] flex gap-4 p-4 rounded text-[#4183c4] border border-[#276f86]`}>
                <div className={`flex justify-center items-center text-[#276f86]`}>
                  <BsInfo size={40}/>
                </div>
                <div>
                  <h3 className={`text-[#276f86] font-bold text-l`}>Reset Password</h3>
                  <p>Hanya bisa dilakukan oleh Admin</p>
                </div>
              </div>
            </div>
            <div className={`flex-1`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {initData.map((app: any) => (
                    <Link href={app.url} key={app.id}>
                      <div className={`border border-gray-300 rounded p-4 bg-white shadow-md`}>
                        <div className={`flex flex-row justify-between items-center`}>
                          <div>
                            <div className="text-md font-semibold text-black">{app.name}</div>
                            <div className="text-[10px] font-semibold text-gray-400 mb-3">PT Vuteq Indonesia</div>
                          </div>
                          {/*<Image className={`hidden xl:block`} width={90} height={20} src="/images/img.png" alt="Logo"/>*/}
                        </div>
                        <p className={`text-black text-xs font-normal mb-3`}>{app.description}</p>
                        <Button className={`w-full border-green-500 text-green-500`}>
                          Open
                        </Button>
                      </div>
                    </Link>
                ))}
              </div>
            </div>
          </Content>
        </Content>
        <div className={`text-center fixed bottom-0 w-full py-2`}>
          <span>Design By Ghost © {new Date().getFullYear()}</span>
        </div>
      </Layout>
    </Suspense>
  );
};

export default Portal;
