import { Mail, Globe } from "lucide-react";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ReactNode } from "react";

interface ResumeContentZHProps {
  Badge: React.FC<{ children: ReactNode }>;
}

export default function ResumeContentZH({ Badge }: ResumeContentZHProps) {
  return (
    <>
      {/* 個人資訊與聯絡方式 */}
      <div className="mb-4">
        <article className="space-y-4">
          <div>
            <div className="flex gap-x-4 items-center">
              <h1 className="text-xl sm:text-3xl font-bold">王柏淵</h1>
              <h2 className="text-sm sm:text-xl text-gray-600 dark:text-gray-400">
                全端工程師
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-4">
            <div className="sm:col-span-2 [hyphens:auto] order-last sm:order-first">
              專注於 React 與 Node.js
              開發。雖僅一年經驗，已完成多個全端專案。商管本科背景賦予我獨特視角，能從業務需求出發設計解決方案。技術與商業思維的結合讓我在團隊中能有效溝通並將創意轉化為實用功能。{" "}
            </div>
            {/* 聯絡方式 */}
            <div className="sm:col-span-1 sm:justify-self-end order-first sm:order-last">
              <ul className="space-y-2 whitespace-nowrap">
                <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-5 w-5" />
                  <a className="underline" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Icons.github className="h-5 w-5" />
                  <a className="underline" href={siteConfig.links.github}>
                    github.com/Brian-Wang0926
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Globe className="h-5 w-5" />
                  <a className="underline" href={siteConfig.links.personalSite}>
                    brianwang.vercel.app
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>

      {/* 兩列佈局：技能和工作經驗 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* 左側：技能與教育背景 */}
        <div className="space-y-6">
          <article>
            <h2 className="text-2xl font-bold">SKILLS</h2>
            <hr className="mb-3 border-neutral-400 border-t-1" />
            <div className="space-y-3">
              <div>
                <section>
                  <h3 className="font-bold">Front-End</h3>
                  <ul className="list-disc list-outside pl-4">
                    <li>React / Next.js</li>
                    <li>JavaScript / TypeScript</li>
                    <li>Tailwind CSS / Bootstrap</li>
                    <li>HTML / CSS / RWD</li>
                    <li>Redux / Zustand </li>
                  </ul>
                </section>
              </div>
              <div>
                <section>
                  <h3 className="font-bold">Back-End</h3>
                  <ul className="list-disc list-outside pl-4">
                    <li>Node.js / Express</li>
                    <li>Python / Flask</li>
                    <li>RESTful API / WebSocket (Socket.IO)</li>
                    <li>MySQL / MongoDB / MsSQL</li>
                    <li>Redis / RabbitMQ</li>
                  </ul>
                </section>
              </div>
              <div>
                <section>
                  <h3 className="font-bold">Tools & Others</h3>
                  <ul className="list-disc list-outside pl-4">
                    <li>Git / GitHub / CICD</li>
                    <li>Docker / Nginx</li>
                    <li>AWS (EC2, RDS, S3, CloudFront)</li>
                    <li>Jest / Supertest</li>
                  </ul>
                </section>
              </div>

              {/* 教育背景 */}
              <div className="pt-6">
                <h2 className="text-2xl font-bold">EDUCATION</h2>
                <hr className="mb-3 border-neutral-400 border-t-1" />
                <div className="space-y-5">
                  <section className="space-y-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      2018 - 2019
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        長庚大學 / 碩士 / 工商管理學所
                      </h3>
                      <div>任 EMBA 教學助理及教授研究助理</div>
                      <div>於一年內完成論文並順利畢業</div>
                    </div>
                  </section>
                  <section className="space-y-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      2014 - 2018
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        長庚大學 / 學士 / 工商管理學系
                      </h3>
                      <div>任服務性社團副社長及營隊總召</div>
                      <div>全國社團評鑑特優，總服務時數 352 小時</div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* 右側：工作經驗及專案 */}
        <div className="space-y-6">
          {/* 工作經驗 */}
          <article>
            <h2 className="text-2xl font-bold">WORK EXPERIENCE</h2>
            <hr className="mb-3 border-neutral-400 border-t-1" />
            <div className="space-y-5">
              <section className="space-y-1">
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-between">
                  <div>Apr 2024 - Present</div>
                </div>
                <h3 className="text-lg font-bold">
                  <div>
                    <span>
                      <a className="underline underline-offset-2" href="#">
                        永豐金證券
                      </a>
                    </span>
                    <span> | </span>
                    <span>全端工程師</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>建立並維護帳務系統功能，提升系統效能與使用者體驗</li>
                    <li>
                      將舊有帳務系統前端重構為React框架，改善介面互動性與維護性
                    </li>
                    <li>弱點掃描及更新過時套件，以符合資安規定</li>
                  </ul>
                </div>
                <div className="flex pt-1 flex-wrap gap-1">
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>MsSQL</Badge>
                  <Badge>MongoDB</Badge>
                </div>
              </section>

              <section className="space-y-1">
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-between">
                  <div>Jul 2023 - Dec 2023</div>
                </div>
                <h3 className="text-lg font-bold">
                  <div>
                    <span>
                      <a
                        className="underline underline-offset-2"
                        href="https://wehelp.tw/"
                      >
                        WeHelp Bootcamp
                      </a>
                    </span>
                    <span> | </span>
                    <span>Trainee</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>
                      參與為期6個月、每週超過60小時的高強度全職培訓，培養獨立解決問題的能力
                    </li>
                    <li>
                      完成完整電商網站開發，包含會員系統、金流串接及雲端服務整合
                    </li>
                    <li>
                      獨立規劃並建立個人專案，負責從時程規劃、技術選擇到最終部署的全流程
                    </li>
                  </ul>
                </div>
                <div className="flex pt-1 flex-wrap gap-1">
                  <Badge>JavaScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                </div>
              </section>
            </div>
          </article>
          {/* 專案 */}
          <article>
            <h2 className="text-2xl font-bold">PROJECTS</h2>
            <hr className="mb-3 border-neutral-400 border-t-1" />
            <div className="space-y-5">
              <section className="space-y-1">
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-between">
                  <div>Oct 2023 - Dec 2023</div>
                </div>
                <h3 className="text-lg font-bold">
                  <div>
                    <span>
                      <a
                        className="underline underline-offset-2"
                        href="https://github.com/Brian-Wang0926/Vcard"
                      >
                        Vcard
                      </a>
                    </span>
                    <span> | </span>
                    <span>交友配對社群平台</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>
                      開發看板功能(文章CRUD、按讚、收藏)、會員系統(Google登入)、每日抽卡配對及即時聊天功能
                    </li>
                    <li>整合Google OAuth、JWT認證、RESTful API及MVC架構設計</li>
                    <li>
                      應用Socket.IO實現即時通訊、Redis優化快取、AWS雲端服務部署
                    </li>
                    <li>
                      使用Docker容器化、CI/CD自動部署、Nginx反向代理及SSL加密
                    </li>
                  </ul>
                </div>
                <div className="flex pt-1 flex-wrap gap-1">
                  <Badge>Node.js/Express</Badge>
                  <Badge>React</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>Socket.IO</Badge>
                  <Badge>AWS</Badge>
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
