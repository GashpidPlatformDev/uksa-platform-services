export function Template(name, lastname, email, phone, phonetype, location, requestFor, method, whotakecourse, language, comments) {
    return `
    <!DOCTYPE html>
    <html>

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }

            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }

            img {
                -ms-interpolation-mode: bicubic;
            }

            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            table {
                border-collapse: collapse !important;
            }

            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }

                .mobile-center {
                    text-align: center !important;
                }
            }

            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>

        <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                            <tr>
                                <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#00a2ff">
                                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                            <tr>
                                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                                    <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Quote request</h1>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                            <tr>
                                                <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                    <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                        <tr>
                                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                                <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Contact form</a></p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                        <tr>
                                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                <svg width="128" height="34" viewBox="0 0 128 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.387 0.233212C9.9897 0.527199 5.02961 3.58014 2.21035 8.36685C0.159984 11.8344 -0.503371 16.1537 0.386128 20.2243C0.876106 22.4858 2.08974 25.011 3.5446 26.8353C4.07981 27.5062 5.35375 28.7952 6.02465 29.3455C8.39916 31.2828 11.4295 32.5567 14.5578 32.9411C15.4624 33.0467 17.5504 33.0316 18.4776 32.911C25.1413 32.014 30.5763 27.2725 32.2649 20.8801C32.7096 19.1991 32.7624 18.7544 32.7624 16.6211C32.7624 14.4878 32.7096 14.0506 32.2649 12.3621C30.712 6.48232 25.9102 1.89914 19.9099 0.57243C18.4701 0.255825 17.0228 0.150291 15.387 0.233212ZM17.4072 8.14071C20.1963 8.43469 22.5859 9.55034 24.2594 11.3369C26.8148 14.0657 26.7696 17.8197 24.1614 20.5032L23.6036 21.0761L24.0031 21.5435C24.6664 22.3199 25.3524 22.8702 26.2419 23.3074L26.8073 23.5863L25.5635 23.5939C23.8222 23.5939 22.5935 23.3753 21.5004 22.8551C21.1386 22.6893 21.0632 22.6742 20.8597 22.7571C17.8369 23.9482 14.4975 23.9557 11.5501 22.7722C8.76853 21.6566 6.81615 19.5534 6.29602 17.1111C6.16033 16.4779 6.16033 15.2492 6.29602 14.6084C7.17044 10.5077 12.1758 7.59042 17.4072 8.14071Z" fill="#07B8DC"/>
                                                    <path d="M10.8717 11.5194C10.4647 11.7229 10.2988 12.0093 10.2988 12.4767C10.2988 12.9139 10.4345 13.1627 10.819 13.4491C11.0225 13.6074 11.0903 13.6074 16.1032 13.6074C21.116 13.6074 21.1839 13.6074 21.3874 13.4491C21.9226 13.0496 22.0658 12.537 21.7794 11.9943C21.4477 11.3535 21.7492 11.3837 16.1032 11.3837C11.5125 11.3837 11.1054 11.3912 10.8717 11.5194Z" fill="#07B8DC"/>
                                                    <path d="M10.8717 15.2869C10.4647 15.4905 10.2988 15.7769 10.2988 16.2443C10.2988 16.6815 10.4345 16.9303 10.819 17.2167C11.0225 17.375 11.0903 17.375 16.1032 17.375C21.116 17.375 21.1839 17.375 21.3874 17.2167C21.9226 16.8172 22.0658 16.3046 21.7794 15.7618C21.4477 15.1211 21.7492 15.1513 16.1032 15.1513C11.5125 15.1513 11.1054 15.1588 10.8717 15.2869Z" fill="#07B8DC"/>
                                                    <path d="M10.8114 18.7702C10.1706 19.1622 10.0877 20.014 10.6455 20.5492L10.8717 20.7678L16.0127 20.7904C21.0029 20.8055 21.1612 20.8055 21.3949 20.6622C21.7567 20.4361 21.9 20.1647 21.9 19.72C21.9 19.4335 21.8547 19.2602 21.7266 19.0868C21.3798 18.5968 21.6286 18.6194 16.0881 18.6194C11.2335 18.6194 11.0451 18.627 10.8114 18.7702Z" fill="#07B8DC"/>
                                                    <path d="M38.2275 17.376V33.3945H38.7175H39.2075V17.376V1.35749H38.7175H38.2275V17.376Z" fill="#07B8DC"/>
                                                    <path d="M94.6504 2.18793C92.1628 2.57991 90.2708 3.98954 89.5999 5.95699C89.223 7.0651 89.1853 8.34658 89.4868 9.5376C90.022 11.6181 91.5372 12.6885 95.3515 13.6836C98.0124 14.3771 99.0301 14.8671 99.3316 15.5832C99.5653 16.1335 99.3919 16.9325 98.9396 17.3546C98.0275 18.2064 95.6982 18.214 93.7609 17.3848C92.992 17.0456 92.1779 16.5782 91.5296 16.0882L91.0095 15.6963L89.7582 17.1963L88.5068 18.6889L89.1325 19.1713C90.6175 20.3322 92.193 21.0559 94.1604 21.4931C95.1856 21.7192 97.3264 21.772 98.3064 21.6061C101.058 21.1237 102.844 19.6688 103.447 17.4225C103.56 16.9928 103.598 16.6008 103.606 15.8696C103.613 14.7615 103.493 14.1359 103.131 13.3896C102.407 11.8895 100.545 10.7889 97.3792 9.98235C95.6454 9.54514 94.3489 9.04762 93.9418 8.66318C93.5046 8.24858 93.3539 7.40431 93.6252 6.87664C93.9192 6.31128 94.4695 6.00222 95.3741 5.88161C96.7762 5.70823 98.5552 6.24344 100.289 7.35908C100.568 7.54 100.824 7.69076 100.854 7.69076C100.892 7.69076 102.731 5.06749 103.003 4.62274C103.086 4.48706 102.234 3.87647 101.246 3.36388C99.6859 2.54976 98.2536 2.19547 96.3465 2.15024C95.6605 2.13516 94.8992 2.15024 94.6504 2.18793Z" fill="#FF0000"/>
                                                    <path d="M110.94 11.8124C108.701 17.0741 106.862 21.3934 106.847 21.4311C106.824 21.4612 107.789 21.4763 108.98 21.4688L111.144 21.4462L112.011 19.3129L112.878 17.1871H116.888H120.906L121.102 17.6545C121.207 17.9183 121.599 18.8757 121.969 19.7878L122.647 21.4462L124.833 21.4688C126.039 21.4763 127.027 21.4612 127.027 21.4236C127.027 21.3934 125.202 17.0741 122.964 11.8275L118.908 2.29933L116.956 2.27671L115.003 2.26163L110.94 11.8124ZM118.169 10.4556L119.391 13.4558L118.162 13.4784C117.491 13.4859 116.36 13.4859 115.659 13.4784L114.378 13.4558L115.621 10.4179C116.307 8.75196 116.888 7.40264 116.91 7.41771C116.926 7.44033 117.491 8.80473 118.169 10.4556Z" fill="#FF0000"/>
                                                    <path d="M46.0974 2.44443C46.0748 2.4972 46.0748 5.30892 46.0899 8.67846C46.12 15.2743 46.12 15.2291 46.5271 16.6236C47.2507 19.066 49.0825 20.8073 51.6078 21.448C53.53 21.938 55.9196 21.8702 57.676 21.2747C60.3821 20.355 61.9727 18.4403 62.5531 15.3799C62.6737 14.724 62.6888 14.1361 62.6888 8.52016V2.37659L60.6007 2.35397L58.5127 2.3389L58.4825 8.38447C58.4599 13.8119 58.4448 14.4904 58.3318 14.92C57.8116 16.8498 56.4623 17.8674 54.3969 17.8674C52.3465 17.8674 50.9896 16.8196 50.462 14.8446C50.3489 14.415 50.3338 13.7215 50.3112 8.34678L50.2811 2.3389H48.2081C46.5195 2.3389 46.1275 2.36151 46.0974 2.44443Z" fill="#07B8DC"/>
                                                    <path d="M68.6062 11.911V21.4844H70.7169H72.8276V18.537V15.5971L73.9206 14.489C74.6066 13.7879 75.0362 13.411 75.0664 13.4638C75.1041 13.509 76.4308 15.3333 78.0213 17.5193L80.916 21.4844H83.4337C84.8132 21.4844 85.9439 21.4693 85.9439 21.4542C85.9439 21.4316 84.1423 18.9817 81.9411 16.0042C79.7325 13.0341 77.9309 10.5616 77.9233 10.5089C77.9158 10.4636 79.6269 8.63941 81.7225 6.45335C83.8181 4.26729 85.5368 2.44307 85.5519 2.40537C85.567 2.36768 84.5569 2.33753 83.0643 2.33753H80.5541L76.7097 6.4835L72.8652 10.6295L72.8276 6.49858L72.7899 2.37522L70.7018 2.35261L68.6062 2.33753V11.911Z" fill="#07B8DC"/>
                                                    <path d="M76.4836 26.8442C75.8806 26.9196 75.3604 27.1834 74.9383 27.6357C74.3503 28.2614 74.2222 28.6006 74.2222 29.5504C74.2222 30.2665 74.2448 30.3871 74.4332 30.7716C74.7046 31.3143 75.1644 31.7817 75.6921 32.0304C76.2801 32.3094 77.2148 32.3395 77.8179 32.1134C78.3908 31.9023 79.0164 31.3294 79.2878 30.7716C79.4762 30.3871 79.4989 30.2665 79.4989 29.5504C79.4989 28.8494 79.4762 28.7061 79.3029 28.3368C78.8053 27.2814 77.6897 26.6935 76.4836 26.8442ZM77.8405 27.6583C79.3029 28.48 79.2652 30.7339 77.7726 31.4877C76.755 32.0003 75.466 31.5405 75.0061 30.4927C74.4709 29.2715 75.0891 27.8016 76.2801 27.4623C76.7776 27.3267 77.3806 27.402 77.8405 27.6583Z" fill="#07B8DC"/>
                                                    <path d="M109.048 26.8442C108.445 26.9196 107.925 27.1834 107.503 27.6357C106.915 28.2614 106.787 28.6006 106.787 29.5504C106.787 30.2439 106.809 30.3947 106.983 30.7565C107.232 31.2842 107.729 31.7817 108.257 32.0304C108.845 32.3094 109.78 32.3395 110.383 32.1134C110.955 31.9023 111.581 31.3294 111.852 30.7716C112.041 30.3871 112.064 30.2665 112.064 29.5504C112.064 28.8494 112.041 28.7061 111.868 28.3368C111.37 27.2814 110.254 26.6935 109.048 26.8442ZM110.405 27.6583C111.868 28.48 111.83 30.7339 110.337 31.4877C109.32 32.0003 108.031 31.5405 107.571 30.4927C107.036 29.2715 107.654 27.8016 108.845 27.4623C109.342 27.3267 109.945 27.402 110.405 27.6583Z" fill="#07B8DC"/>
                                                    <path d="M81.1496 26.9499C80.4637 27.2062 80.0265 27.9675 80.2074 28.6158C80.3808 29.2565 80.7426 29.5128 81.9185 29.8219C83.0417 30.1083 83.3055 30.3043 83.3055 30.832C83.3055 31.3974 82.8683 31.6914 82.0542 31.6838C81.4813 31.6763 80.9084 31.4577 80.5315 31.1109L80.3506 30.9451L80.1697 31.1561C80.0717 31.2692 79.9888 31.3898 79.9888 31.42C79.9888 31.4954 80.6597 31.9401 81.0064 32.0909C81.225 32.1813 81.519 32.219 82.0618 32.2266C82.7025 32.2266 82.8608 32.2039 83.1322 32.0607C83.6297 31.7969 83.8558 31.4275 83.8935 30.8697C83.9538 29.95 83.5015 29.5505 82.0467 29.2113C81.4738 29.0756 80.9989 28.8495 80.8933 28.6535C80.8557 28.5706 80.818 28.3746 80.818 28.2087C80.818 27.3795 82.0844 27.1082 83.0869 27.7338L83.4412 27.9524L83.6071 27.7263C83.8106 27.4549 83.7503 27.372 83.1699 27.0856C82.6573 26.8368 81.6547 26.769 81.1496 26.9499Z" fill="#07B8DC"/>
                                                    <path d="M119.692 29.4514C119.044 30.8912 118.509 32.0973 118.509 32.1275C118.509 32.1652 118.637 32.1878 118.803 32.1878H119.089L119.398 31.5093L119.715 30.8309L121.154 30.846L122.602 30.8686L122.881 31.5093L123.16 32.1501L123.506 32.1727L123.853 32.1953L123.529 31.4566C123.348 31.0495 122.805 29.851 122.323 28.7956L121.456 26.8734L121.17 26.8508L120.876 26.8282L119.692 29.4514ZM121.69 28.8182C121.969 29.4439 122.217 30.0243 122.247 30.0922C122.293 30.2203 122.21 30.2279 121.147 30.2279C120.084 30.2279 120.001 30.2203 120.046 30.0922C120.174 29.7454 121.117 27.6649 121.147 27.6649C121.17 27.6649 121.411 28.185 121.69 28.8182Z" fill="#07B8DC"/>
                                                    <path d="M125.104 27.0096C124.667 27.2207 124.516 27.3714 124.351 27.7634C124.117 28.3212 124.253 28.9092 124.697 29.2786C124.991 29.5273 125.12 29.5801 126.047 29.8289C126.861 30.0399 127.185 30.2133 127.313 30.4922C127.434 30.7485 127.426 30.8767 127.29 31.1631C127.11 31.54 126.778 31.6908 126.16 31.6908C125.587 31.6833 125.255 31.5702 124.743 31.2159L124.411 30.9897L124.207 31.2008L123.996 31.4194L124.253 31.6079C125.3 32.4069 126.846 32.4823 127.577 31.7737C127.901 31.4571 128.037 31.0802 127.992 30.6053C127.924 29.8967 127.486 29.565 126.16 29.2183C125.745 29.1052 125.323 28.9545 125.218 28.8791C124.75 28.5399 124.735 27.9594 125.195 27.6127C125.436 27.4242 125.534 27.4016 126.001 27.4016C126.461 27.4091 126.605 27.4468 127.019 27.6654L127.502 27.9217L127.675 27.7031C127.848 27.4921 127.848 27.4694 127.72 27.3714C127.049 26.8513 125.805 26.6779 125.104 27.0096Z" fill="#07B8DC"/>
                                                    <path d="M46.4441 29.5492V32.1875H48.3663H50.2885V31.9237V31.6598H48.6678H47.0471V30.7176V29.7753H48.4794H49.9116V29.5115V29.2476H48.4794H47.0471V28.3431V27.4385H48.6678H50.2885V27.1746V26.9108H48.3663H46.4441V29.5492Z" fill="#07B8DC"/>
                                                    <path d="M51.6379 28.1998L52.6178 29.4889L51.6002 30.8382L50.5901 32.1875H50.9519H51.3137L52.1279 31.0945C52.5726 30.4914 52.9646 30.0014 52.9948 30.0014C53.0174 30.009 53.4018 30.499 53.8541 31.0945L54.6607 32.1875H54.9999C55.1883 32.1875 55.3391 32.1724 55.3391 32.1498C55.3391 32.1272 54.8944 31.5166 54.3516 30.7929L53.3641 29.4813L54.3139 28.2375C54.8341 27.5516 55.2637 26.9787 55.2637 26.956C55.2637 26.9334 55.113 26.9108 54.9245 26.9108H54.5853L53.8013 27.9737L53.0174 29.029L52.5349 28.4034C52.2636 28.0566 51.9017 27.5817 51.7208 27.3405C51.4042 26.9183 51.3967 26.9108 51.0273 26.9108H50.6579L51.6379 28.1998Z" fill="#07B8DC"/>
                                                    <path d="M55.9421 29.5492V32.1875H56.2814H56.6206V31.2452V30.303H57.5251C58.5729 30.303 59.078 30.1597 59.47 29.7602C60.3293 28.8632 59.96 27.3706 58.7991 27.0314C58.5126 26.941 58.0679 26.9108 57.1709 26.9108H55.9421V29.5492ZM58.7086 27.642C59.1232 27.8455 59.2891 28.1244 59.2891 28.5918C59.2891 29.0516 59.1383 29.3155 58.7388 29.5642C58.5051 29.715 58.3468 29.7376 57.5478 29.7678L56.6206 29.7904V28.6069V27.4159L57.5251 27.4611C58.181 27.4912 58.4976 27.5365 58.7086 27.642Z" fill="#07B8DC"/>
                                                    <path d="M60.4651 29.5492V32.1875H62.425H64.3849V31.9237V31.6598H62.7642H61.1435V30.7176V29.7753H62.5758H64.008V29.5115V29.2476H62.5758H61.1435V28.3431V27.4385H62.7265H64.3095V27.1746V26.9108H62.3873H60.4651V29.5492Z" fill="#07B8DC"/>
                                                    <path d="M65.0632 29.5492V32.1875H65.3648H65.6663V31.1699V30.1522H66.4126H67.1588L67.9202 31.1699L68.6815 32.1875H69.066H69.4504L69.2695 31.9387C69.164 31.8106 68.8097 31.3282 68.4705 30.8759L67.8523 30.0542L68.1086 29.9638C68.9906 29.6547 69.4127 28.9536 69.2092 28.1018C69.1414 27.838 69.0283 27.6345 68.8323 27.4385C68.38 26.9862 68.0408 26.9108 66.4427 26.9108H65.0632V29.5492ZM68.0559 27.6119C68.4252 27.8078 68.6062 28.0868 68.6062 28.4712C68.6062 28.916 68.4554 29.1722 68.0936 29.3833C67.8222 29.5341 67.694 29.5492 66.7292 29.5492H65.6663V28.4863V27.4159L66.7442 27.4536C67.5282 27.4837 67.875 27.5214 68.0559 27.6119Z" fill="#07B8DC"/>
                                                    <path d="M69.5862 27.1746V27.4385H70.4908H71.3953V29.813V32.1875H71.6969H71.9984V29.813V27.4385H72.903H73.8075V27.1746V26.9108H71.6969H69.5862V27.1746Z" fill="#07B8DC"/>
                                                    <path d="M86.3962 29.5492V32.1875H88.3185H90.2407V31.9237V31.6598H88.62H86.9993V30.7176V29.7753H88.4315H89.8638V29.5115V29.2476H88.4315H86.9993V28.3431V27.4385H88.62H90.2407V27.1746V26.9108H88.3185H86.3962V29.5492Z" fill="#07B8DC"/>
                                                    <path d="M90.9189 29.5492V32.1875H91.2205H91.522V30.0768C91.522 28.916 91.5446 27.9661 91.5823 27.9737C91.6125 27.9737 92.3738 28.9235 93.2859 30.0844C94.8614 32.1046 94.9443 32.1875 95.1855 32.1875H95.4418V29.5492V26.9108H95.1403H94.8388L94.8237 28.9913L94.8011 31.0643L93.1804 28.9913L91.5597 26.9183L91.2431 26.9108H90.9189V29.5492Z" fill="#07B8DC"/>
                                                    <path d="M98.231 29.5492V32.1875H98.5325H98.834V29.5492V26.9108H98.5325H98.231V29.5492Z" fill="#07B8DC"/>
                                                    <path d="M99.8894 29.5497V32.2031L101.194 32.173C102.467 32.1504 102.498 32.1428 102.995 31.9091C103.839 31.5096 104.344 30.8538 104.488 29.9718C104.676 28.7959 104.073 27.6501 102.995 27.1526C102.588 26.9641 102.483 26.9491 101.231 26.9264L99.8894 26.8963V29.5497ZM102.679 27.6727C103.9 28.2004 104.269 29.8663 103.387 30.8915C102.92 31.4418 102.641 31.5398 101.495 31.5699L100.492 31.6001V29.5045V27.4164L101.389 27.4616C102.075 27.4993 102.385 27.5446 102.679 27.6727Z" fill="#07B8DC"/>
                                                    <path d="M105.317 29.5492V32.1875H105.618H105.92V29.5492V26.9108H105.618H105.317V29.5492Z" fill="#07B8DC"/>
                                                    <path d="M112.855 29.5492V32.1875H113.157H113.458L113.473 30.0919L113.496 28.0038L114.43 29.3758C114.951 30.1296 115.388 30.7326 115.418 30.7176C115.441 30.7025 115.87 30.0919 116.36 29.3607L117.265 28.034L117.287 30.107L117.302 32.1875H117.642H117.981V29.5492V26.9108H117.642H117.302L116.383 28.3054C115.87 29.0667 115.433 29.6999 115.41 29.6999C115.388 29.6999 114.951 29.0743 114.438 28.3054L113.511 26.9108H113.187H112.855V29.5492Z" fill="#07B8DC"/>
                                                </svg>
                                                <br><br><br>
                                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Quote information </h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="padding-top: 20px;">
                                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                    <tr>
                                                        <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Customer information </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> Name </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> ${name} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Last name </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${lastname} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Email </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${email} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Phone </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> (${phonetype}) ${phone} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Location </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${location} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Course information </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Request on behalf of a company? </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${requestFor} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Learning method </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${method} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Who will take the course? </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${whotakecourse} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Language of interest </td>
                                                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> ${language} </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> User comments </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px; text-align: justify;"> ${comments} </td>
                                                    </tr>                                            
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style=" padding: 35px; background-color: #61a3ff;" bgcolor="#1b9ba3">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                        <tr>
                                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Automatic email sent from uksaidiomas platform </h2>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    `
}