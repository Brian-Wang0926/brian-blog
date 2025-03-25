import { Mail, Globe } from "lucide-react";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function ResumeContentZH() {
  return (
    <>
      {/* 個人資訊與聯絡方式 */}
      <div className="mb-6">
        <article className="space-y-4">
          <div>
            <div className="space-y-1 ms:flex gap-x-4 items-center">
              <h1 className="text-3xl font-bold">王柏淵</h1>
              <h2 className="text-xl">Full-Stack Engineer</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-6">
            <div className="sm:col-span-2 [hyphens:auto] order-last sm:order-first">
              我是一個全端工程師我是一個全端工程師
              我是一個全端工程師我是一個全端工程師
              我是一個全端工程師我是一個全端工程師我是一個全端工程
              師我是一個全端工程師我是一個全端工程師我是一個全端工程師我是一個全端工
              程師我是一個全端工程師我是一個全端工程師我是一個全端工程師我是一個全端工程師
            </div>
            {/* 聯絡方式 */}
            <div className="sm:col-span-1 sm:justify-self-end order-first sm:order-last">
              <ul className="space-y-2 whitespace-nowrap">
                <li className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <a className="underline" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Icons.github className="h-5 w-5" />
                  <a className="underline" href={siteConfig.links.github}>
                    github.com/Brian-Wang0926
                  </a>
                </li>
                <li className="flex items-center space-x-2">
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
        {/* 左側：技能 */}
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
                    <li>TypeScript</li>
                    <li>CSS / Tailwind</li>
                    <li>HTML</li>
                  </ul>
                </section>
              </div>
              <div>
                <section>
                  <h3 className="font-bold">Back-End</h3>
                  <ul className="list-disc list-outside pl-4">
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>MongoDB</li>
                    <li>PostgreSQL</li>
                  </ul>
                </section>
              </div>
              <div>
                <section>
                  <h3 className="font-bold">Tools & Others</h3>
                  <ul className="list-disc list-outside pl-4">
                    <li>Git / GitHub</li>
                    <li>Docker</li>
                    <li>AWS / Vercel</li>
                    <li>CI/CD</li>
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
                      2016 - 2020
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">University Name</h3>
                      <div>Bachelor of Science</div>
                      <div>Computer Science</div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* 右側：工作經驗 */}
        <div className="space-y-6">
          <article>
            <h2 className="text-2xl font-bold">WORK EXPERIENCE</h2>
            <hr className="mb-3 border-neutral-400 border-t-1" />
            <div className="space-y-5">
              <section className="space-y-1">
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-between">
                  <div>Jan 2023 - Present</div>
                </div>
                <h3 className="text-lg font-bold">
                  <div>
                    <span>
                      <a className="underline underline-offset-2" href="#">
                        Example Company
                      </a>
                    </span>
                    <span> | </span>
                    <span>Senior Developer</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>
                      Led development of key company products using React and
                      Node.js
                    </li>
                    <li>
                      Optimized application performance and user experience
                    </li>
                    <li>
                      Managed team of junior developers and conducted code
                      reviews
                    </li>
                  </ul>
                </div>
                <div className="flex pt-1 flex-wrap gap-2">
                  <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400 border-2 rounded-lg border-gray-600 dark:border-gray-400 px-1">
                    React
                  </span>
                  <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400 border-2 rounded-lg border-gray-600 dark:border-gray-400 px-1">
                    TypeScript
                  </span>
                  <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400 border-2 rounded-lg border-gray-600 dark:border-gray-400 px-1">
                    Node.js
                  </span>
                </div>
              </section>

              <section className="space-y-1">
                <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-between">
                  <div>Jun 2020 - Dec 2022</div>
                </div>
                <h3 className="text-lg font-bold">
                  <div>
                    <span>
                      <a className="underline underline-offset-2" href="#">
                        Previous Company
                      </a>
                    </span>
                    <span> | </span>
                    <span>Web Developer</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>
                      Developed responsive web applications using modern
                      technologies
                    </li>
                    <li>
                      Collaborated with design team to implement UI/UX
                      improvements
                    </li>
                    <li>Participated in agile development process</li>
                  </ul>
                </div>
                <div className="flex pt-1 flex-wrap gap-2">
                  <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400 border-2 rounded-lg border-gray-600 dark:border-gray-400 px-1">
                    JavaScript
                  </span>
                  <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400 border-2 rounded-lg border-gray-600 dark:border-gray-400 px-1">
                    HTML/CSS
                  </span>
                  <span className="text-sm whitespace-nowrap text-gray-600 dark:text-gray-400 border-2 rounded-lg border-gray-600 dark:border-gray-400 px-1">
                    MongoDB
                  </span>
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
