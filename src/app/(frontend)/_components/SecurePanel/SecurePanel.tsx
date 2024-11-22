import cx from 'classnames'
import type { ISecurePanel } from 'payload-types'
import styles from './SecurePanel.module.scss'
import SecureVideo from './SecureBgVideo'

type SecurePanelProps = ISecurePanel & {
  className?: string
}

export default async function SecurePanel({ text, className }: SecurePanelProps) {
  return (
    <section className={cx(styles.wrap, className)}>
      <SecureVideo videoSrc='/en/video/home_secure_desktop.webm' mobileVideoSrc='/en/video/home_security_mobile.webm' />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.header}>Secure</h1>
          <div className={styles.stats}>
            <div className={styles.circleGraph}>
              <svg width='77' height='77' viewBox='0 0 77 77' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M18.4963 33.8426L22.5732 28.3621L25.3091 28.3725L20.3161 34.9536L19.7888 34.7836C20.2541 34.4333 20.7351 34.1791 21.2317 34.021C21.7443 33.847 22.2567 33.7609 22.7687 33.7629C23.9686 33.7674 25.0156 34.0354 25.9096 34.5668C26.8197 35.0823 27.521 35.7969 28.0135 36.7108C28.522 37.6247 28.7741 38.6577 28.7697 39.8097C28.7651 41.0257 28.481 42.1046 27.9174 43.0465C27.3699 43.9724 26.6152 44.6976 25.6532 45.2219C24.7072 45.7463 23.6342 46.0062 22.4342 46.0017C21.2342 45.9971 20.1472 45.721 19.1733 45.1733C18.2154 44.6257 17.4582 43.8788 16.9018 42.9327C16.3454 41.9865 16.0694 40.9295 16.0738 39.7615C16.0764 39.0735 16.1509 38.4338 16.2971 37.8423C16.4594 37.2509 16.7177 36.6359 17.0721 35.9973C17.4266 35.3586 17.9013 34.6404 18.4963 33.8426ZM18.4737 39.7946C18.4707 40.5946 18.636 41.3072 18.9696 41.9325C19.3033 42.5418 19.7655 43.0235 20.3561 43.3778C20.9628 43.7161 21.6582 43.8867 22.4422 43.8897C23.2102 43.8926 23.8908 43.7272 24.4841 43.3935C25.0774 43.0437 25.5432 42.5655 25.8816 41.9587C26.2199 41.336 26.3906 40.6247 26.3937 39.8247C26.3967 39.0247 26.2314 38.32 25.8977 37.7108C25.564 37.1015 25.1018 36.6277 24.5111 36.2895C23.9204 35.9353 23.2411 35.7567 22.4731 35.7538C21.6891 35.7508 20.9924 35.9241 20.3831 36.2738C19.7898 36.6076 19.324 37.0778 18.9857 37.6845C18.6474 38.2913 18.4768 38.9946 18.4737 39.7946ZM28.6611 28.3852L40.781 28.4312L40.7728 30.5912L28.6529 30.5452L28.6611 28.3852ZM38.9535 29.3363L40.7728 30.5912L34.1391 45.7581L31.6911 45.7488L38.9535 29.3363ZM50.6901 32.5729C50.6868 33.4209 50.492 34.1801 50.1054 34.8507C49.7349 35.5213 49.2209 36.0473 48.5634 36.4288C47.906 36.7943 47.1453 36.9755 46.2813 36.9722C45.4333 36.969 44.682 36.7821 44.0274 36.4116C43.3729 36.0251 42.8549 35.4952 42.4735 34.8217C42.108 34.1483 41.9269 33.3876 41.9301 32.5396C41.9334 31.6756 42.1203 30.9083 42.4909 30.2377C42.8774 29.5672 43.3994 29.0492 44.0568 28.6837C44.7142 28.3022 45.467 28.113 46.315 28.1162C47.1789 28.1195 47.9382 28.3144 48.5928 28.7009C49.2473 29.0714 49.7574 29.5933 50.1228 30.2667C50.5043 30.9402 50.6933 31.7089 50.6901 32.5729ZM48.8421 32.5659C48.8451 31.7819 48.6155 31.149 48.1533 30.6672C47.6912 30.1695 47.0761 29.9191 46.3081 29.9162C45.5721 29.9134 44.9632 30.1591 44.4813 30.6533C44.0155 31.1315 43.7811 31.7626 43.7781 32.5466C43.7752 33.3146 44.0048 33.9475 44.4669 34.4453C44.9451 34.9271 45.5522 35.1694 46.2882 35.1722C47.0402 35.175 47.6491 34.9374 48.1149 34.4591C48.5968 33.9649 48.8392 33.3339 48.8421 32.5659ZM59.8495 28.5276L46.6078 45.8055L44.3038 45.7967L57.5455 28.5189L59.8495 28.5276ZM62.2713 41.7609C62.268 42.6089 62.0732 43.3682 61.6866 44.0387C61.3161 44.7093 60.8021 45.2354 60.1446 45.6169C59.4872 45.9824 58.7265 46.1635 57.8625 46.1602C57.0145 46.157 56.2632 45.9701 55.6086 45.5997C54.9541 45.2132 54.4361 44.6832 54.0547 44.0097C53.6732 43.3363 53.4841 42.5756 53.4873 41.7276C53.4906 40.8636 53.6855 40.1043 54.072 39.4498C54.4585 38.7792 54.9805 38.2612 55.6379 37.8957C56.2953 37.5142 57.0481 37.3251 57.8961 37.3283C58.7601 37.3316 59.5193 37.5264 60.1739 37.9129C60.8285 38.2834 61.3385 38.8054 61.7039 39.4788C62.0854 40.1362 62.2745 40.8969 62.2713 41.7609ZM60.3993 41.7538C60.4022 40.9698 60.1726 40.3369 59.7105 39.8552C59.2484 39.3574 58.6413 39.1071 57.8893 39.1043C57.1373 39.1014 56.5284 39.3471 56.0625 39.8413C55.5967 40.3196 55.3623 40.9507 55.3593 41.7347C55.3564 42.5027 55.586 43.1356 56.0481 43.6333C56.5103 44.1151 57.1174 44.3574 57.8694 44.3602C58.6214 44.3631 59.2303 44.1254 59.6961 43.6472C60.162 43.1529 60.3964 42.5218 60.3993 41.7538Z' fill='#232323' />
                <path d='M77 38.5C77 59.763 59.763 77 38.5 77C17.237 77 0 59.763 0 38.5C0 17.237 17.237 0 38.5 0C59.763 0 77 17.237 77 38.5ZM10.1001 38.5C10.1001 54.1848 22.8152 66.8999 38.5 66.8999C54.1848 66.8999 66.8999 54.1848 66.8999 38.5C66.8999 22.8152 54.1848 10.1001 38.5 10.1001C22.8152 10.1001 10.1001 22.8152 10.1001 38.5Z' fill='#FFF1F3' />
                <path d='M38.5 0C45.5103 8.35968e-08 52.3875 1.91406 58.3898 5.53571C64.3922 9.15736 69.2917 14.3491 72.56 20.5509C75.8282 26.7528 77.3411 33.7292 76.9355 40.7278C76.5298 47.7263 74.221 54.4813 70.2581 60.264C66.2952 66.0467 60.8287 70.6376 54.4481 73.5415C48.0676 76.4454 41.0152 77.5521 34.0519 76.7422C27.0886 75.9323 20.4785 73.2364 14.9348 68.9456C9.39113 64.6547 5.12422 58.9316 2.59437 52.3937L12.3415 48.6221C14.1846 53.3852 17.2932 57.5546 21.332 60.6807C25.3707 63.8067 30.1864 65.7707 35.2594 66.3608C40.3324 66.9508 45.4703 66.1446 50.1188 64.029C54.7672 61.9134 58.7498 58.5687 61.6369 54.3558C64.524 50.1429 66.2061 45.2217 66.5016 40.123C66.7971 35.0243 65.6949 29.9417 63.3139 25.4235C60.9328 20.9052 57.3633 17.1229 52.9904 14.4844C48.6175 11.8459 43.6072 10.4514 38.5 10.4514V0Z' fill='#E62058' />
              </svg>
            </div>
            <span className={styles.counter}>FLR Staked</span>
            {text && (
              <p className={styles.text}>
                {text}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
