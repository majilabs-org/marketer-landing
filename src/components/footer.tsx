import LogoIcon from "@/src/components/logo-icon";

const columns: { title: string; links: string[] }[] = [
  { title: "Marketing", links: ["Ember", "Marketer"] },
  { title: "Stage", links: ["Startups", "Scaling brands", "Enterprise"] },
  { title: "Team", links: ["Founders", "Creative strategist", "Media Buyers"] },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Terms of use", "Privacy Policy"],
  },
  {
    title: "Industries",
    links: ["Fashion", "Beauty", "Food & Beverage", "Home & Life", "Wellness"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white">
      <div className="max-w-[1200px] mx-auto border-l border-r border-white/10 border-dashed">
        <div className="pt-16 px-8 flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <a title="Home" href="/" className="inline-block">
              <LogoIcon className="h-7 w-auto text-white" />
            </a>
            <h2 className="mt-8 text-[44px] leading-[1.05] font-semibold tracking-[-1.5px]">
              Unlock AI-native marketing
              <span className="block text-[#8c8c8c]">
                Put growth on autopilot
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="h-9 px-4 rounded-[6px] bg-white text-[#18181b] text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
              Get started
            </button>
            <button className="h-9 pl-4 pr-2.5 rounded-[6px] bg-[#1a1a1a] border border-white/10 text-white text-sm font-medium flex items-center gap-2 hover:bg-[#222] transition-colors cursor-pointer">
              Talk to sales
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-dashed border-white/10" />

        <div className="py-8 px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {columns.map((col) => (
            <ul key={col.title} className="flex flex-col gap-y-2">
              <li className="text-sm text-[#737373] flex items-center">
                {col.title}
              </li>
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white hover:text-[#8c8c8c] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="border-t border-white/10 border-dashed px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#737373]">
              Ask about Marketer on
            </span>
            <div className="flex items-center gap-1.5">
              <a
                href="https://chatgpt.com/?q=What+does+marketer.com+do%3F"
                target="_blank"
                rel="noopener noreferrer"
                title="ChatGPT"
                className="w-6 h-6 flex items-center justify-center rounded-[6px] bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_footer_chatgpt"
                    maskUnits="userSpaceOnUse"
                    x="3"
                    y="3"
                    width="14"
                    height="14"
                  >
                    <path
                      d="M16.25 3.80591H3.75V16.1943H16.25V3.80591Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_footer_chatgpt)">
                    <path
                      d="M8.54431 8.31528V7.13837C8.54431 7.03925 8.58152 6.96489 8.66819 6.91537L11.0345 5.55267C11.3565 5.36685 11.7406 5.28018 12.137 5.28018C13.6236 5.28018 14.5652 6.43232 14.5652 7.65873C14.5652 7.74543 14.5652 7.84455 14.5527 7.94367L12.0998 6.50658C11.9512 6.41988 11.8024 6.41988 11.6538 6.50658L8.54431 8.31528ZM14.0696 12.899V10.0868C14.0696 9.9133 13.9952 9.78944 13.8466 9.70274L10.7371 7.89404L11.7529 7.31175C11.8396 7.26225 11.914 7.26225 12.0007 7.31175L14.3669 8.67447C15.0483 9.07095 15.5066 9.9133 15.5066 10.7309C15.5066 11.6724 14.9492 12.5396 14.0696 12.8989V12.899ZM7.8134 10.4214L6.79755 9.82675C6.71088 9.77723 6.67367 9.70287 6.67367 9.60375V6.87832C6.67367 5.55277 7.68952 4.54924 9.06467 4.54924C9.58505 4.54924 10.0681 4.72274 10.477 5.03242L8.0365 6.44477C7.88789 6.53144 7.81353 6.65532 7.81353 6.8288V10.4215L7.8134 10.4214ZM9.99999 11.6849L8.54431 10.8673V9.13302L9.99999 8.31541L11.4556 9.13302V10.8673L9.99999 11.6849ZM10.9353 15.4511C10.415 15.4511 9.9319 15.2776 9.52298 14.9679L11.9635 13.5556C12.1121 13.4689 12.1865 13.345 12.1865 13.1715V9.57889L13.2148 10.1735C13.3014 10.223 13.3386 10.2974 13.3386 10.3965V13.1219C13.3386 14.4475 12.3104 15.451 10.9353 15.451V15.4511ZM7.99922 12.6885L5.63296 11.3258C4.95154 10.9293 4.49323 10.0869 4.49323 9.26932C4.49323 8.31541 5.0631 7.46062 5.94263 7.10132V9.92587C5.94263 10.0993 6.01701 10.2232 6.16563 10.3099L9.2628 12.1062L8.24695 12.6885C8.16028 12.738 8.08589 12.738 7.99922 12.6885ZM7.86302 14.7202C6.46312 14.7202 5.43485 13.6672 5.43485 12.3664C5.43485 12.2672 5.44727 12.1681 5.45958 12.069L7.9001 13.4813C8.04871 13.568 8.19746 13.568 8.34607 13.4813L11.4556 11.6851V12.862C11.4556 12.9611 11.4184 13.0355 11.3317 13.085L8.96545 14.4477C8.64333 14.6335 8.25927 14.7202 7.8629 14.7202H7.86302ZM10.9353 16.1943C12.4343 16.1943 13.6855 15.129 13.9705 13.7166C15.358 13.3574 16.25 12.0566 16.25 10.731C16.25 9.8638 15.8784 9.02146 15.2094 8.4144C15.2713 8.15422 15.3085 7.89404 15.3085 7.63399C15.3085 5.86247 13.8714 4.53682 12.2113 4.53682C11.8769 4.53682 11.5548 4.58631 11.2327 4.69788C10.6751 4.15276 9.90704 3.80591 9.06467 3.80591C7.56567 3.80591 6.3145 4.87125 6.02946 6.28358C4.64197 6.64288 3.75 7.94367 3.75 9.26919C3.75 10.1364 4.12161 10.9788 4.79061 11.5858C4.72867 11.846 4.69149 12.1062 4.69149 12.3662C4.69149 14.1378 6.12858 15.4634 7.78864 15.4634C8.12307 15.4634 8.44519 15.4139 8.76731 15.3024C9.32474 15.8475 10.0928 16.1943 10.9353 16.1943Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </a>
              <a
                href="https://claude.ai/new?q=What+does+marketer.com+do%3F"
                target="_blank"
                rel="noopener noreferrer"
                title="Claude"
                className="w-6 h-6 flex items-center justify-center rounded-[6px] bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_footer_claude)">
                    <path
                      d="M6.2026 12.0599L8.66094 10.6813L8.7026 10.5615L8.66094 10.4948H8.54167L8.13021 10.4698L6.725 10.4318L5.50677 10.3813L4.32656 10.3177L4.02917 10.2547L3.75 9.8875L3.77865 9.70417L4.02865 9.53698L4.38594 9.56823L5.1776 9.62188L6.36406 9.70417L7.22448 9.75469L8.5 9.8875H8.7026L8.73125 9.80573L8.66146 9.75469L8.60781 9.70417L7.37969 8.87292L6.05052 7.99375L5.35469 7.4875L4.9776 7.23177L4.78802 6.99115L4.70573 6.46615L5.0474 6.0901L5.50625 6.12135L5.62344 6.15313L6.08854 6.51042L7.08229 7.27917L8.37969 8.23385L8.56979 8.39219L8.64531 8.33854L8.65521 8.30052L8.56979 8.15781L7.86406 6.88385L7.11094 5.58698L6.77552 5.04948L6.68698 4.72708C6.65324 4.60326 6.63505 4.47572 6.63281 4.3474L7.0224 3.81979L7.2375 3.75L7.75625 3.81979L7.975 4.00938L8.29792 4.74583L8.81979 5.90677L9.62969 7.4849L9.86719 7.9526L9.99375 8.38594L10.0411 8.51875H10.1234V8.44271L10.1901 7.55417L10.3135 6.46302L10.4333 5.05938L10.475 4.66354L10.6708 4.18958L11.0599 3.93333L11.3641 4.07917L11.6141 4.43594L11.5792 4.66719L11.4302 5.63125L11.1391 7.14323L10.9495 8.15469H11.0599L11.1865 8.02865L11.6995 7.34844L12.5599 6.27344L12.9401 5.84635L13.3828 5.37552L13.6677 5.15104H14.2057L14.6016 5.73906L14.4245 6.34635L13.8703 7.04792L13.4115 7.64271L12.7531 8.52813L12.3417 9.23646L12.3797 9.29375L12.4776 9.28333L13.9651 8.96771L14.7688 8.82188L15.7276 8.65781L16.1615 8.8599L16.2089 9.06563L16.038 9.48594L15.0125 9.73906L13.8099 9.97969L12.0188 10.4031L11.9969 10.4188L12.0224 10.4505L12.8292 10.5266L13.174 10.5453H14.0188L15.5917 10.6625L16.0031 10.9344L16.25 11.2667L16.2089 11.5193L15.576 11.8422L14.7219 11.6396L12.7276 11.1656L12.0443 10.9943H11.9495V11.0516L12.5188 11.6078L13.5635 12.5505L14.8703 13.7641L14.9365 14.0651L14.7688 14.3021L14.5917 14.2766L13.4432 13.4135L13 13.0245L11.9969 12.1807H11.9302V12.2693L12.1615 12.6073L13.3828 14.4411L13.4464 15.0036L13.3578 15.1875L13.0411 15.2984L12.6932 15.2349L11.9776 14.2323L11.2406 13.1036L10.6453 12.0917L10.5724 12.1333L10.2214 15.9115L10.0568 16.1042L9.67708 16.25L9.36094 16.0099L9.19323 15.6208L9.36094 14.8521L9.56354 13.85L9.7276 13.0531L9.87656 12.0635L9.9651 11.7344L9.95885 11.7125L9.88594 11.7219L9.13906 12.7464L8.00365 14.2802L7.10469 15.2411L6.88906 15.3266L6.51563 15.1339L6.55052 14.7891L6.75938 14.4823L8.00313 12.901L8.75313 11.9208L9.2375 11.3552L9.23438 11.2729H9.20573L5.90208 13.4167L5.31354 13.4927L5.0599 13.2552L5.09167 12.8667L5.21198 12.7401L6.20573 12.0568L6.2026 12.0599Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_footer_claude">
                      <rect
                        width="12.5"
                        height="12.5"
                        fill="white"
                        transform="translate(3.75 3.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href="https://www.perplexity.ai/search?q=What+does+marketer.com+do%3F"
                target="_blank"
                rel="noopener noreferrer"
                title="Perplexity"
                className="w-6 h-6 flex items-center justify-center rounded-[6px] bg-white/10 hover:bg-white/20 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_footer_perplexity)">
                    <path
                      d="M14.0547 3.75V7.5375H15.4688V12.9271H13.9401V16.25L10.275 13.024V16.2245H9.70677V13.0203L6.0375 16.25V12.8828H4.53125V7.49375H6.03333V3.75L9.70677 7.13229V3.84896H10.2745V7.22917L14.0547 3.75ZM10.275 8.46042V12.2724L13.3719 14.9984V11.2708L10.275 8.46042ZM9.7026 8.41875L6.60573 11.2302V14.9984L9.7026 12.2724V8.41927V8.41875ZM13.9401 12.3667H14.9005V8.09844H10.7604L13.9401 10.9839V12.3667ZM9.26198 8.05417H5.09896V12.3224H6.03646V10.9807L9.26146 8.05365L9.26198 8.05417ZM6.60156 5.03958V7.49271H9.26563L6.60156 5.03958ZM13.4865 5.03958L10.8224 7.49271H13.4865V5.03958Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_footer_perplexity">
                      <rect
                        width="12.5"
                        height="12.5"
                        fill="white"
                        transform="translate(3.75 3.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-sm text-[#737373]">
            © {new Date().getFullYear()} Marketer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
