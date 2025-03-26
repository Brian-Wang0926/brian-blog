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
      {/* Personal Information and Contact */}
      <div className="mb-4">
        <article className="space-y-4">
          <div>
            <div className="flex gap-x-4 items-center">
              <h1 className="text-xl sm:text-3xl font-bold">Brian Wang</h1>
              <h2 className="text-sm sm:text-xl text-gray-600 dark:text-gray-400">
                Full-Stack Engineer
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-4">
            <div className="sm:col-span-2 [hyphens:auto] order-last sm:order-first">
              React and Node.js developer with one year of experience building
              full-stack projects. My business management background provides
              unique insights for business-driven solutions. This blend of
              skills enables effective communication and practical feature
              implementation.
            </div>
            {/* Contact Information */}
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

      {/* Two-column layout: Skills and Work Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Left Side: Skills and Education */}
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

              {/* Education */}
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
                        Chang Gung University / Master&apos;s Degree / Business
                        Administration
                      </h3>
                      <div>
                        Served as EMBA Teaching Assistant and Professor&apos;s
                        Research Assistant
                      </div>
                      <div>Completed thesis and graduated within one year</div>
                    </div>
                  </section>
                  <section className="space-y-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      2014 - 2018
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        Chang Gung University / Bachelor&apos;s Degree /
                        Business Administration
                      </h3>
                      <div>
                        Served as Vice President of Service Club and Camp
                        Director
                      </div>
                      <div>
                        National Outstanding Club Award, with 352 total service
                        hours
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Right Side: Work Experience and Projects */}
        <div className="space-y-6">
          {/* Work Experience */}
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
                        SinoPac Securities
                      </a>
                    </span>
                    <span> | </span>
                    <span>Full-Stack Engineer</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>
                      Built and maintained accounting systems to improve
                      performance and user experience
                    </li>
                    <li>
                      Refactored legacy frontend to React, enhancing interface
                      interactivity and maintainability
                    </li>
                    <li>
                      Conducted security scans and updated packages to meet
                      security regulations
                    </li>
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
                      Completed 6-month intensive bootcamp (60+ hours weekly),
                      developing strong problem-solving skills
                    </li>
                    <li>
                      Built full e-commerce website with membership, payment,
                      and cloud integration
                    </li>
                    <li>
                      Independently managed projects from planning through
                      deployment
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
          {/* Projects */}
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
                    <span>Dating & Social Matching Platform</span>
                  </div>
                </h3>
                <div>
                  <ul className="[hyphens:auto] list-disc list-outside pl-4">
                    <li>
                      Developed forum features, membership system, matching
                      system, and real-time chat
                    </li>
                    <li>
                      Integrated OAuth, JWT authentication, RESTful APIs, and
                      MVC architecture
                    </li>
                    <li>
                      Implemented Socket.IO for messaging, Redis for caching,
                      and AWS for deployment
                    </li>
                    <li>
                      Used Docker, CI/CD pipelines, Nginx, and SSL for secure
                      deployment
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
