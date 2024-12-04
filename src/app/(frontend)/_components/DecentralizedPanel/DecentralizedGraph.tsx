'use client'

import { useRef, useState, useEffect } from 'react'
import cx from 'classnames'
import styles from './DecentralizedPanel.module.scss'

export default function DecentralizedGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [activePoints, setActivePoints] = useState([false, false, false, false])

  useEffect(() => {
    const observerOptions = {
      root: null, // Use viewport as root
      threshold: [0, 0.75], // Trigger when 75% visible
    }

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.75 && entry.isIntersecting) {
          // Start drawing animation when 75% visible
          setIsDrawing(true)

          // Trigger data points fade-in with staggered delays
          const points = [0, 1, 2, 3]
          const delays = [0, 400, 800, 2000]
          points.forEach((i) => {
            setTimeout(() => {
              setActivePoints((prev) => {
                const newPoints = [...prev]
                newPoints[i] = true
                return newPoints
              })
            }, delays[i])
          })
        } else if (entry.intersectionRatio === 0 && !entry.isIntersecting) {
          // Reset animation when element is fully out of view
          setIsDrawing(false)
          setActivePoints([false, false, false, false]) // Reset points visibility
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, observerOptions)

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cx(styles.bgGraphWrap, styles.default)}
    >
      <svg
        className={styles.graph}
        viewBox='0 0 1440 496'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path className={styles.highlightFill} d='M486.771 488.008L480.687 488.002L480.693 486.85L483.573 484.434C483.87 484.187 484.119 483.96 484.32 483.752C484.529 483.545 484.694 483.35 484.815 483.166C484.936 482.982 485.025 482.799 485.082 482.615C485.139 482.431 485.168 482.231 485.169 482.015C485.171 481.519 485.045 481.135 484.79 480.862C484.536 480.589 484.176 480.452 483.712 480.451C483.232 480.449 482.852 480.608 482.57 480.927C482.288 481.247 482.142 481.686 482.132 482.246L480.608 482.242C480.619 481.602 480.753 481.046 481.012 480.575C481.27 480.096 481.632 479.729 482.097 479.474C482.563 479.211 483.103 479.081 483.719 479.083C484.343 479.085 484.879 479.202 485.325 479.435C485.78 479.661 486.131 479.986 486.377 480.41C486.623 480.835 486.744 481.344 486.741 481.936C486.74 482.24 486.694 482.531 486.605 482.811C486.523 483.083 486.398 483.351 486.229 483.614C486.06 483.87 485.85 484.129 485.601 484.392C485.352 484.655 485.058 484.931 484.721 485.218L482.576 487.035L482.026 486.566L486.778 486.58L486.771 488.008ZM487.739 483.654C487.744 482.742 487.899 481.947 488.207 481.268C488.522 480.589 488.957 480.058 489.511 479.676C490.073 479.285 490.726 479.091 491.47 479.093C492.222 479.096 492.873 479.293 493.423 479.687C493.981 480.073 494.41 480.606 494.711 481.287C495.019 481.968 495.171 482.764 495.167 483.676C495.163 484.58 495.011 485.372 494.711 486.051C494.412 486.73 493.985 487.257 493.431 487.631C492.878 488.005 492.209 488.191 491.425 488.189C490.657 488.187 489.994 487.997 489.435 487.619C488.885 487.242 488.464 486.713 488.171 486.032C487.879 485.351 487.735 484.558 487.739 483.654ZM489.251 483.659C489.248 484.331 489.333 484.907 489.506 485.388C489.68 485.86 489.93 486.221 490.257 486.47C490.584 486.711 490.975 486.832 491.431 486.833C491.903 486.835 492.3 486.716 492.621 486.477C492.95 486.23 493.204 485.87 493.382 485.399C493.561 484.919 493.652 484.344 493.655 483.672C493.658 482.976 493.573 482.391 493.4 481.919C493.226 481.438 492.976 481.074 492.649 480.825C492.33 480.576 491.935 480.451 491.463 480.449C491.007 480.448 490.614 480.571 490.285 480.818C489.956 481.065 489.702 481.428 489.524 481.908C489.345 482.379 489.254 482.963 489.251 483.659ZM502.298 488.053L496.214 488.047L496.22 486.895L499.1 484.48C499.397 484.232 499.646 484.005 499.847 483.798C500.056 483.59 500.221 483.395 500.342 483.211C500.463 483.028 500.552 482.844 500.609 482.66C500.666 482.476 500.695 482.276 500.696 482.06C500.698 481.564 500.572 481.18 500.318 480.907C500.063 480.634 499.704 480.497 499.24 480.496C498.76 480.495 498.379 480.653 498.097 480.973C497.816 481.292 497.67 481.731 497.659 482.291L496.135 482.287C496.146 481.647 496.281 481.091 496.539 480.62C496.797 480.141 497.159 479.774 497.624 479.519C498.09 479.257 498.63 479.126 499.246 479.128C499.87 479.13 500.406 479.247 500.853 479.481C501.308 479.706 501.658 480.031 501.904 480.456C502.15 480.88 502.271 481.389 502.268 481.981C502.267 482.285 502.221 482.577 502.132 482.856C502.051 483.128 501.925 483.396 501.756 483.659C501.587 483.915 501.378 484.174 501.128 484.438C500.879 484.701 500.586 484.976 500.248 485.263L498.103 487.081L497.553 486.611L502.305 486.625L502.298 488.053ZM509.447 488.074L503.363 488.068L503.368 486.916L506.248 484.5C506.546 484.253 506.795 484.026 506.996 483.819C507.205 483.611 507.37 483.416 507.491 483.232C507.612 483.048 507.701 482.865 507.757 482.681C507.814 482.497 507.843 482.297 507.844 482.081C507.847 481.585 507.721 481.201 507.466 480.928C507.211 480.655 506.852 480.518 506.388 480.517C505.908 480.515 505.527 480.674 505.246 480.994C504.964 481.313 504.818 481.752 504.807 482.312L503.283 482.308C503.294 481.668 503.429 481.112 503.687 480.641C503.946 480.162 504.308 479.795 504.773 479.54C505.238 479.277 505.779 479.147 506.395 479.149C507.019 479.151 507.554 479.268 508.001 479.502C508.456 479.727 508.806 480.052 509.052 480.477C509.298 480.901 509.42 481.41 509.417 482.002C509.415 482.306 509.37 482.598 509.28 482.877C509.199 483.149 509.074 483.417 508.904 483.68C508.735 483.936 508.526 484.195 508.277 484.458C508.027 484.722 507.734 484.997 507.397 485.284L505.252 487.102L504.702 486.632L509.454 486.646L509.447 488.074Z' />
        <path className={styles.highlightFill} d='M37.8531 490.739L31.7691 490.734L31.7748 489.582L34.6547 487.166C34.952 486.919 35.2011 486.692 35.4021 486.484C35.6111 486.277 35.7761 486.081 35.897 485.898C36.0179 485.714 36.1068 485.53 36.1638 485.347C36.2207 485.163 36.2496 484.963 36.2507 484.747C36.2532 484.251 36.1271 483.866 35.8724 483.594C35.6178 483.321 35.2584 483.184 34.7944 483.183C34.3144 483.181 33.9336 483.34 33.6521 483.659C33.3705 483.978 33.2243 484.418 33.2135 484.978L31.6895 484.973C31.7007 484.333 31.8355 483.778 32.0938 483.307C32.3522 482.827 32.714 482.46 33.1792 482.206C33.6445 481.943 34.1852 481.813 34.8012 481.815C35.4252 481.816 35.9606 481.934 36.4075 482.167C36.8624 482.393 37.2127 482.718 37.4587 483.142C37.7046 483.567 37.826 484.075 37.8231 484.667C37.8216 484.971 37.7762 485.263 37.6868 485.543C37.6055 485.815 37.4801 486.082 37.3108 486.346C37.1416 486.601 36.9323 486.861 36.683 487.124C36.4337 487.387 36.1403 487.662 35.8029 487.949L33.6579 489.767L33.1082 489.298L37.8602 489.311L37.8531 490.739ZM38.821 486.386C38.8256 485.474 38.9815 484.679 39.2888 484C39.6042 483.321 40.0388 482.79 40.5927 482.407C41.1547 482.017 41.8076 481.823 42.5516 481.825C43.3036 481.827 43.9546 482.025 44.5047 482.419C45.0628 482.804 45.4922 483.338 45.7928 484.019C46.1015 484.7 46.2535 485.496 46.249 486.408C46.2446 487.312 46.0926 488.104 45.7933 488.783C45.4939 489.462 45.0673 489.989 44.5135 490.363C43.9596 490.737 43.2907 490.923 42.5067 490.921C41.7387 490.919 41.0756 490.729 40.5175 490.351C39.9673 489.974 39.5459 489.444 39.2533 488.764C38.9607 488.083 38.8166 487.29 38.821 486.386ZM40.333 486.391C40.3297 487.063 40.4149 487.639 40.5885 488.119C40.7622 488.592 41.0124 488.953 41.3392 489.202C41.666 489.443 42.0574 489.564 42.5134 489.565C42.9854 489.566 43.382 489.448 43.7032 489.209C44.0324 488.961 44.2862 488.602 44.4645 488.131C44.6429 487.651 44.7337 487.076 44.737 486.404C44.7405 485.708 44.6553 485.123 44.4817 484.651C44.3081 484.17 44.0578 483.806 43.7311 483.557C43.4123 483.308 43.0169 483.183 42.5449 483.181C42.0889 483.18 41.6963 483.303 41.3671 483.55C41.0379 483.797 40.7841 484.16 40.6057 484.639C40.4274 485.111 40.3365 485.695 40.333 486.391ZM53.3804 490.785L47.2964 490.779L47.3021 489.627L50.182 487.211C50.4792 486.964 50.7284 486.737 50.9294 486.53C51.1384 486.322 51.3034 486.127 51.4243 485.943C51.5452 485.759 51.6341 485.576 51.691 485.392C51.7479 485.208 51.7769 485.008 51.778 484.792C51.7804 484.296 51.6543 483.912 51.3997 483.639C51.145 483.366 50.7857 483.229 50.3217 483.228C49.8417 483.226 49.4609 483.385 49.1793 483.705C48.8978 484.024 48.7516 484.463 48.7408 485.023L47.2168 485.019C47.228 484.379 47.3627 483.823 47.6211 483.352C47.8794 482.873 48.2413 482.506 48.7065 482.251C49.1718 481.988 49.7125 481.858 50.3285 481.86C50.9525 481.862 51.4879 481.979 51.9347 482.213C52.3896 482.438 52.74 482.763 52.9859 483.188C53.2318 483.612 53.3533 484.121 53.3504 484.713C53.3489 485.017 53.3035 485.309 53.2141 485.588C53.1327 485.86 53.0074 486.128 52.8381 486.391C52.6688 486.647 52.4596 486.906 52.2103 487.169C51.961 487.433 51.6676 487.708 51.3302 487.995L49.1852 489.813L48.6355 489.343L53.3875 489.357L53.3804 490.785ZM56.2573 483.413L54.3373 483.408L54.3441 482.028L57.7281 482.037L57.6848 490.809L56.2208 490.805L56.2573 483.413Z' />
        <path className={styles.highlightFill} d='M1385.97 495.737L1379.89 495.731L1379.89 494.579L1382.77 492.164C1383.07 491.916 1383.32 491.689 1383.52 491.482C1383.73 491.274 1383.89 491.079 1384.01 490.895C1384.14 490.712 1384.22 490.528 1384.28 490.344C1384.34 490.16 1384.37 489.96 1384.37 489.744C1384.37 489.248 1384.24 488.864 1383.99 488.591C1383.73 488.318 1383.38 488.181 1382.91 488.18C1382.43 488.179 1382.05 488.337 1381.77 488.657C1381.49 488.976 1381.34 489.415 1381.33 489.975L1379.81 489.971C1379.82 489.331 1379.95 488.775 1380.21 488.304C1380.47 487.825 1380.83 487.458 1381.3 487.203C1381.76 486.941 1382.3 486.81 1382.92 486.812C1383.54 486.814 1384.08 486.931 1384.52 487.165C1384.98 487.39 1385.33 487.715 1385.58 488.14C1385.82 488.564 1385.94 489.073 1385.94 489.665C1385.94 489.969 1385.89 490.261 1385.8 490.54C1385.72 490.812 1385.6 491.08 1385.43 491.343C1385.26 491.599 1385.05 491.858 1384.8 492.121C1384.55 492.385 1384.26 492.66 1383.92 492.947L1381.78 494.765L1381.23 494.295L1385.98 494.309L1385.97 495.737ZM1386.94 491.384C1386.94 490.472 1387.1 489.676 1387.41 488.997C1387.72 488.318 1388.16 487.787 1388.71 487.405C1389.27 487.015 1389.92 486.82 1390.67 486.823C1391.42 486.825 1392.07 487.023 1392.62 487.416C1393.18 487.802 1393.61 488.335 1393.91 489.016C1394.22 489.697 1394.37 490.493 1394.37 491.405C1394.36 492.309 1394.21 493.101 1393.91 493.78C1393.61 494.459 1393.18 494.986 1392.63 495.36C1392.08 495.735 1391.41 495.921 1390.62 495.918C1389.86 495.916 1389.19 495.726 1388.63 495.349C1388.08 494.971 1387.66 494.442 1387.37 493.761C1387.08 493.08 1386.93 492.288 1386.94 491.384ZM1388.45 491.388C1388.45 492.06 1388.53 492.636 1388.71 493.117C1388.88 493.589 1389.13 493.95 1389.46 494.199C1389.78 494.44 1390.17 494.561 1390.63 494.562C1391.1 494.564 1391.5 494.445 1391.82 494.206C1392.15 493.959 1392.4 493.6 1392.58 493.128C1392.76 492.649 1392.85 492.073 1392.85 491.401C1392.86 490.705 1392.77 490.121 1392.6 489.648C1392.43 489.168 1392.18 488.803 1391.85 488.554C1391.53 488.305 1391.13 488.18 1390.66 488.179C1390.21 488.177 1389.81 488.3 1389.48 488.547C1389.16 488.794 1388.9 489.157 1388.72 489.637C1388.54 490.108 1388.45 490.692 1388.45 491.388ZM1401.5 495.782L1395.41 495.776L1395.42 494.624L1398.3 492.209C1398.6 491.962 1398.85 491.734 1399.05 491.527C1399.26 491.32 1399.42 491.124 1399.54 490.94C1399.66 490.757 1399.75 490.573 1399.81 490.389C1399.87 490.205 1399.89 490.006 1399.9 489.79C1399.9 489.294 1399.77 488.909 1399.52 488.636C1399.26 488.364 1398.9 488.227 1398.44 488.225C1397.96 488.224 1397.58 488.383 1397.3 488.702C1397.01 489.021 1396.87 489.461 1396.86 490.021L1395.33 490.016C1395.35 489.376 1395.48 488.821 1395.74 488.349C1396 487.87 1396.36 487.503 1396.82 487.249C1397.29 486.986 1397.83 486.855 1398.45 486.857C1399.07 486.859 1399.61 486.977 1400.05 487.21C1400.51 487.435 1400.86 487.76 1401.1 488.185C1401.35 488.61 1401.47 489.118 1401.47 489.71C1401.47 490.014 1401.42 490.306 1401.33 490.586C1401.25 490.857 1401.12 491.125 1400.96 491.389C1400.79 491.644 1400.58 491.904 1400.33 492.167C1400.08 492.43 1399.78 492.705 1399.45 492.992L1397.3 494.81L1396.75 494.34L1401.5 494.354L1401.5 495.782ZM1408.08 487.041L1408.04 495.813L1406.59 495.809L1406.63 487.037L1408.08 487.041ZM1402.15 492.784L1406.15 487.036L1407.77 487.041L1403.71 492.885L1402.15 492.784ZM1409.12 494.148L1402.14 494.128L1402.15 492.784L1409.12 492.804L1409.12 494.148Z' />
        <path className={styles.highlightFill} d='M936.828 495.736L930.744 495.731L930.749 494.579L933.629 492.163C933.927 491.916 934.176 491.689 934.377 491.481C934.586 491.274 934.751 491.078 934.872 490.895C934.993 490.711 935.081 490.527 935.138 490.344C935.195 490.16 935.224 489.96 935.225 489.744C935.228 489.248 935.102 488.863 934.847 488.591C934.592 488.318 934.233 488.181 933.769 488.18C933.289 488.178 932.908 488.337 932.627 488.656C932.345 488.975 932.199 489.415 932.188 489.975L930.664 489.97C930.675 489.33 930.81 488.775 931.068 488.304C931.327 487.824 931.689 487.457 932.154 487.203C932.619 486.94 933.16 486.81 933.776 486.812C934.4 486.813 934.935 486.931 935.382 487.164C935.837 487.39 936.187 487.715 936.433 488.139C936.679 488.564 936.801 489.072 936.798 489.664C936.796 489.968 936.751 490.26 936.661 490.54C936.58 490.812 936.455 491.079 936.285 491.343C936.116 491.598 935.907 491.858 935.658 492.121C935.408 492.384 935.115 492.659 934.778 492.946L932.633 494.764L932.083 494.295L936.835 494.308L936.828 495.736ZM937.796 491.383C937.8 490.471 937.956 489.676 938.263 488.997C938.579 488.318 939.013 487.787 939.567 487.404C940.129 487.014 940.782 486.82 941.526 486.822C942.278 486.824 942.929 487.022 943.479 487.416C944.037 487.801 944.467 488.335 944.767 489.016C945.076 489.697 945.228 490.493 945.224 491.405C945.219 492.309 945.067 493.101 944.768 493.78C944.469 494.459 944.042 494.986 943.488 495.36C942.934 495.734 942.265 495.92 941.481 495.918C940.713 495.916 940.05 495.726 939.492 495.348C938.942 494.971 938.521 494.441 938.228 493.761C937.935 493.08 937.791 492.287 937.796 491.383ZM939.308 491.388C939.304 492.06 939.389 492.636 939.563 493.116C939.737 493.589 939.987 493.95 940.314 494.199C940.641 494.44 941.032 494.561 941.488 494.562C941.96 494.563 942.357 494.445 942.678 494.206C943.007 493.959 943.261 493.599 943.439 493.128C943.617 492.648 943.708 492.073 943.712 491.401C943.715 490.705 943.63 490.12 943.456 489.648C943.283 489.167 943.032 488.803 942.706 488.554C942.387 488.305 941.992 488.18 941.52 488.178C941.064 488.177 940.671 488.3 940.342 488.547C940.012 488.794 939.759 489.157 939.58 489.636C939.402 490.108 939.311 490.692 939.308 491.388ZM952.355 495.782L946.271 495.776L946.277 494.624L949.157 492.208C949.454 491.961 949.703 491.734 949.904 491.527C950.113 491.319 950.278 491.124 950.399 490.94C950.52 490.756 950.609 490.573 950.666 490.389C950.723 490.205 950.752 490.005 950.753 489.789C950.755 489.293 950.629 488.909 950.374 488.636C950.12 488.363 949.76 488.226 949.296 488.225C948.816 488.223 948.436 488.382 948.154 488.702C947.872 489.021 947.726 489.46 947.715 490.02L946.191 490.016C946.203 489.376 946.337 488.82 946.596 488.349C946.854 487.87 947.216 487.503 947.681 487.248C948.146 486.985 948.687 486.855 949.303 486.857C949.927 486.859 950.462 486.976 950.909 487.21C951.364 487.435 951.715 487.76 951.961 488.185C952.206 488.609 952.328 489.118 952.325 489.71C952.324 490.014 952.278 490.306 952.189 490.585C952.107 490.857 951.982 491.125 951.813 491.388C951.643 491.644 951.434 491.903 951.185 492.166C950.936 492.43 950.642 492.705 950.305 492.992L948.16 494.81L947.61 494.34L952.362 494.354L952.355 495.782ZM959.121 488.266L955.938 491.172L954.934 490.461L958.02 487.65L957.752 488.394L953.552 488.381L953.559 487.025L959.127 487.042L959.121 488.266ZM955.997 491.46L954.929 491.457L954.934 490.461C955.086 490.342 955.287 490.262 955.535 490.223C955.783 490.176 956.015 490.152 956.231 490.153C956.647 490.154 957.043 490.219 957.418 490.349C957.794 490.478 958.125 490.667 958.412 490.915C958.706 491.156 958.937 491.457 959.103 491.817C959.269 492.17 959.351 492.574 959.349 493.03C959.346 493.63 959.204 494.15 958.921 494.589C958.639 495.028 958.254 495.367 957.764 495.606C957.283 495.844 956.747 495.963 956.155 495.961C955.579 495.959 955.059 495.846 954.596 495.62C954.141 495.387 953.779 495.05 953.509 494.609C953.247 494.168 953.118 493.632 953.121 493L954.633 493.004C954.631 493.508 954.769 493.901 955.047 494.182C955.334 494.454 955.713 494.592 956.185 494.593C956.665 494.594 957.05 494.451 957.339 494.164C957.637 493.869 957.787 493.482 957.789 493.002C957.791 492.562 957.645 492.197 957.351 491.908C957.056 491.612 956.605 491.462 955.997 491.46Z' />
        <line x1='0.25' y1='426.75' x2='1439.75' y2='426.75' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='494.5' y1='478' x2='494.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='944.5' y1='478.003' x2='944.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='1394.5' y1='478.003' x2='1394.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='94.5' y1='478' x2='94.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='44.5' y1='478' x2='44.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='544.5' y1='478' x2='544.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='994.5' y1='478.003' x2='994.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='144.5' y1='478' x2='144.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='594.5' y1='478' x2='594.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='1044.5' y1='478.003' x2='1044.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='194.5' y1='478' x2='194.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='644.5' y1='478' x2='644.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='1094.5' y1='478.003' x2='1094.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='244.5' y1='478' x2='244.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='694.5' y1='478' x2='694.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='1144.5' y1='478.003' x2='1144.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='294.5' y1='478' x2='294.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='744.5' y1='478.003' x2='744.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='1194.5' y1='478.003' x2='1194.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='344.5' y1='478' x2='344.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='794.5' y1='478.003' x2='794.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='1244.5' y1='478.003' x2='1244.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='394.5' y1='478' x2='394.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='844.5' y1='478.003' x2='844.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='1294.5' y1='478.003' x2='1294.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='444.5' y1='478' x2='444.5' y2='1.00049' className={styles.line} strokeDasharray='2 6' />
        <line x1='894.5' y1='478.003' x2='894.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='1344.5' y1='478.003' x2='1344.5' y2='1.00342' className={styles.line} strokeDasharray='2 6' />
        <line x1='0.25' y1='476.756' x2='1439.75' y2='476.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='380.756' x2='1439.75' y2='380.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='332.756' x2='1439.75' y2='332.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='284.756' x2='1439.75' y2='284.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='236.756' x2='1439.75' y2='236.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='188.756' x2='1439.75' y2='188.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='140.756' x2='1439.75' y2='140.756' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='92.7557' x2='1439.75' y2='92.7559' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='44.7563' x2='1439.75' y2='44.7565' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <line x1='0.25' y1='0.756348' x2='1439.75' y2='0.756501' className={styles.line} strokeWidth='0.5' strokeLinecap='round' strokeDasharray='3 6' />
        <path
          className={cx(styles.highlight, styles.dataLine, {
            [styles.draw]: isDrawing,
          })}
          d='M1394.5 91L944.589 184.106L498.67 330.556C496.906 331.136 495.1 331.578 493.267 331.878L49.7836 404.664C48.145 404.933 46.5409 405.381 45 406V406'
          stroke='#FD6F8C'
          strokeWidth='4'
        />
        <path className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[3] })} d='M1380.09 121.384C1380.09 120.484 1380.36 119.716 1380.89 119.082C1381.43 118.436 1382.14 118.03 1383 117.864L1383.02 118.278C1382.24 118.072 1381.63 117.704 1381.2 117.175C1380.79 116.646 1380.58 116.003 1380.58 115.247C1380.59 114.551 1380.78 113.94 1381.17 113.413C1381.56 112.886 1382.09 112.473 1382.78 112.175C1383.47 111.877 1384.27 111.73 1385.17 111.732C1386.07 111.735 1386.86 111.887 1387.53 112.189C1388.21 112.479 1388.74 112.895 1389.11 113.436C1389.49 113.965 1389.68 114.59 1389.67 115.31C1389.67 116.066 1389.45 116.707 1389.02 117.234C1388.58 117.748 1387.97 118.095 1387.19 118.272L1387.18 117.894C1387.76 117.98 1388.28 118.192 1388.72 118.529C1389.16 118.854 1389.5 119.263 1389.74 119.756C1389.99 120.249 1390.11 120.801 1390.11 121.413C1390.11 122.205 1389.89 122.9 1389.47 123.499C1389.06 124.086 1388.48 124.54 1387.72 124.862C1386.97 125.184 1386.09 125.343 1385.07 125.34C1384.06 125.337 1383.18 125.173 1382.43 124.846C1381.68 124.52 1381.1 124.063 1380.69 123.473C1380.28 122.872 1380.08 122.176 1380.09 121.384ZM1382.34 121.228C1382.33 121.648 1382.44 122.014 1382.66 122.327C1382.88 122.64 1383.2 122.881 1383.61 123.05C1384.02 123.219 1384.52 123.305 1385.1 123.306C1385.65 123.308 1386.13 123.225 1386.54 123.058C1386.96 122.892 1387.28 122.659 1387.5 122.359C1387.73 122.048 1387.84 121.676 1387.84 121.244C1387.85 120.608 1387.6 120.104 1387.1 119.73C1386.61 119.357 1385.94 119.169 1385.1 119.166C1384.26 119.164 1383.59 119.348 1383.08 119.718C1382.59 120.089 1382.34 120.592 1382.34 121.228ZM1382.67 115.451C1382.67 115.991 1382.89 116.43 1383.33 116.767C1383.77 117.092 1384.37 117.256 1385.11 117.258C1385.84 117.26 1386.43 117.1 1386.86 116.777C1387.3 116.455 1387.53 116.023 1387.53 115.483C1387.53 114.931 1387.31 114.499 1386.87 114.185C1386.44 113.86 1385.86 113.696 1385.13 113.694C1384.38 113.692 1383.79 113.852 1383.34 114.175C1382.9 114.486 1382.67 114.911 1382.67 115.451ZM1391.65 118.591C1391.66 117.223 1391.89 116.03 1392.35 115.011C1392.82 113.993 1393.48 113.197 1394.31 112.623C1395.15 112.038 1396.13 111.746 1397.24 111.75C1398.37 111.753 1399.35 112.05 1400.17 112.64C1401.01 113.219 1401.66 114.019 1402.11 115.04C1402.57 116.061 1402.8 117.256 1402.79 118.624C1402.78 119.98 1402.56 121.167 1402.11 122.186C1401.66 123.205 1401.02 123.995 1400.19 124.556C1399.36 125.118 1398.35 125.397 1397.18 125.393C1396.03 125.39 1395.03 125.105 1394.19 124.539C1393.37 123.972 1392.74 123.179 1392.3 122.157C1391.86 121.136 1391.64 119.947 1391.65 118.591ZM1393.92 118.598C1393.91 119.606 1394.04 120.47 1394.3 121.191C1394.56 121.9 1394.94 122.441 1395.43 122.814C1395.92 123.176 1396.5 123.358 1397.19 123.36C1397.9 123.362 1398.49 123.183 1398.97 122.825C1399.47 122.454 1399.85 121.915 1400.11 121.208C1400.38 120.489 1400.52 119.625 1400.52 118.617C1400.53 117.573 1400.4 116.697 1400.14 115.988C1399.88 115.267 1399.5 114.72 1399.01 114.347C1398.54 113.973 1397.94 113.786 1397.23 113.784C1396.55 113.782 1395.96 113.966 1395.47 114.336C1394.97 114.707 1394.59 115.252 1394.33 115.971C1394.06 116.678 1393.92 117.554 1393.92 118.598Z' />
        <path className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[2] })} d='M932.786 210.384L935.649 206.522L938.277 206.53L934.544 211.469L933.969 211.323C934.234 211.084 934.559 210.899 934.944 210.768C935.34 210.637 935.725 210.572 936.097 210.574C936.997 210.576 937.788 210.777 938.47 211.175C939.152 211.561 939.683 212.102 940.064 212.799C940.444 213.484 940.633 214.271 940.628 215.159C940.624 216.095 940.403 216.922 939.968 217.641C939.544 218.348 938.96 218.904 938.214 219.31C937.48 219.716 936.645 219.917 935.709 219.914C934.761 219.912 933.91 219.699 933.156 219.277C932.414 218.855 931.829 218.283 931.4 217.562C930.972 216.829 930.76 216.012 930.764 215.112C930.767 214.572 930.829 214.074 930.952 213.619C931.086 213.151 931.298 212.66 931.589 212.144C931.891 211.629 932.29 211.042 932.786 210.384ZM933.122 215.137C933.12 215.677 933.225 216.151 933.439 216.56C933.665 216.968 933.97 217.287 934.352 217.517C934.747 217.746 935.203 217.861 935.719 217.862C936.223 217.864 936.667 217.751 937.052 217.524C937.438 217.298 937.739 216.98 937.957 216.573C938.187 216.166 938.303 215.692 938.306 215.152C938.309 214.624 938.197 214.162 937.971 213.765C937.757 213.356 937.459 213.038 937.076 212.808C936.693 212.579 936.249 212.464 935.745 212.463C935.229 212.461 934.773 212.574 934.376 212.801C933.979 213.027 933.671 213.345 933.453 213.752C933.235 214.147 933.125 214.609 933.122 215.137ZM942.062 213.147C942.069 211.779 942.303 210.586 942.764 209.567C943.237 208.548 943.889 207.752 944.72 207.179C945.563 206.593 946.542 206.302 947.658 206.305C948.786 206.309 949.763 206.605 950.588 207.196C951.425 207.774 952.069 208.574 952.52 209.596C952.983 210.617 953.211 211.812 953.204 213.18C953.197 214.536 952.97 215.723 952.521 216.742C952.072 217.76 951.432 218.55 950.601 219.112C949.77 219.674 948.767 219.953 947.591 219.949C946.439 219.946 945.444 219.661 944.607 219.094C943.782 218.528 943.15 217.734 942.711 216.713C942.272 215.692 942.056 214.503 942.062 213.147ZM944.33 213.154C944.325 214.162 944.453 215.026 944.713 215.747C944.974 216.456 945.349 216.997 945.839 217.37C946.33 217.731 946.917 217.913 947.601 217.915C948.309 217.917 948.904 217.739 949.385 217.38C949.879 217.01 950.26 216.471 950.527 215.764C950.795 215.044 950.931 214.181 950.936 213.173C950.941 212.129 950.814 211.253 950.553 210.544C950.293 209.823 949.917 209.276 949.427 208.902C948.949 208.529 948.356 208.341 947.648 208.339C946.964 208.337 946.375 208.522 945.881 208.892C945.387 209.263 945.007 209.808 944.739 210.527C944.472 211.234 944.335 212.11 944.33 213.154Z' />
        <path className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[1] })} d='M494.328 353.332L489.555 357.692L488.048 356.626L492.677 352.409L492.275 353.524L485.975 353.506L485.985 351.472L494.337 351.496L494.328 353.332ZM489.642 358.125L488.04 358.12L488.048 356.626C488.277 356.447 488.577 356.327 488.95 356.269C489.322 356.198 489.67 356.163 489.994 356.164C490.618 356.165 491.212 356.263 491.775 356.457C492.338 356.65 492.834 356.934 493.265 357.307C493.707 357.668 494.053 358.119 494.302 358.66C494.551 359.189 494.674 359.795 494.671 360.479C494.666 361.379 494.453 362.159 494.029 362.817C493.606 363.476 493.028 363.984 492.294 364.342C491.572 364.7 490.767 364.878 489.879 364.875C489.015 364.873 488.236 364.702 487.542 364.364C486.859 364.014 486.316 363.509 485.911 362.848C485.518 362.187 485.324 361.382 485.329 360.434L487.597 360.441C487.593 361.197 487.8 361.785 488.218 362.206C488.648 362.616 489.217 362.821 489.925 362.823C490.645 362.825 491.222 362.611 491.656 362.18C492.103 361.738 492.327 361.156 492.331 360.436C492.334 359.776 492.115 359.23 491.673 358.796C491.231 358.351 490.554 358.127 489.642 358.125ZM496.003 358.107C496.009 356.739 496.243 355.546 496.704 354.527C497.177 353.509 497.829 352.712 498.66 352.139C499.503 351.553 500.482 351.262 501.598 351.265C502.726 351.269 503.703 351.566 504.528 352.156C505.365 352.734 506.009 353.534 506.46 354.556C506.923 355.577 507.151 356.772 507.145 358.14C507.138 359.496 506.91 360.683 506.461 361.702C506.012 362.72 505.372 363.51 504.541 364.072C503.71 364.634 502.707 364.913 501.531 364.909C500.379 364.906 499.384 364.621 498.547 364.055C497.722 363.488 497.09 362.694 496.651 361.673C496.212 360.652 495.996 359.463 496.003 358.107ZM498.271 358.114C498.266 359.122 498.393 359.986 498.654 360.707C498.914 361.416 499.29 361.957 499.78 362.33C500.27 362.692 500.857 362.873 501.541 362.875C502.249 362.877 502.844 362.699 503.326 362.34C503.82 361.97 504.2 361.431 504.468 360.724C504.735 360.005 504.872 359.141 504.877 358.133C504.882 357.089 504.754 356.213 504.494 355.504C504.233 354.783 503.858 354.236 503.368 353.863C502.89 353.489 502.296 353.301 501.588 353.299C500.904 353.297 500.316 353.482 499.822 353.852C499.328 354.223 498.947 354.768 498.68 355.487C498.412 356.194 498.276 357.07 498.271 358.114Z' />
        <path className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[0] })} d='M39.0468 434.557L36.1668 434.548L36.177 432.478L41.253 432.493L41.188 445.651L38.992 445.644L39.0468 434.557ZM47.8577 445.886C46.9457 445.884 46.1426 445.701 45.4484 445.339C44.7662 444.965 44.2348 444.448 43.8541 443.787C43.4854 443.114 43.3032 442.333 43.3076 441.445L45.5756 441.452C45.5719 442.196 45.7791 442.778 46.197 443.2C46.6149 443.621 47.1899 443.832 47.9219 443.835C48.4379 443.836 48.8824 443.735 49.2554 443.532C49.6404 443.318 49.9359 443.012 50.1419 442.617C50.3599 442.222 50.4701 441.76 50.4727 441.232C50.4752 440.728 50.3754 440.284 50.1733 439.899C49.9833 439.503 49.7028 439.196 49.3319 438.979C48.9609 438.762 48.5115 438.652 47.9835 438.651C47.4795 438.649 47.0109 438.762 46.5778 438.989C46.1567 439.203 45.8253 439.484 45.5836 439.832L43.5518 439.394L45.2058 432.505L52.0638 432.525L52.0533 434.649L46.2573 434.632L47.0349 433.914L45.9521 438.105L45.1766 438.427C45.4673 437.875 45.9013 437.457 46.4788 437.17C47.0682 436.872 47.729 436.724 48.461 436.726C49.337 436.729 50.0981 436.917 50.7442 437.291C51.4024 437.665 51.9098 438.182 52.2666 438.843C52.6354 439.492 52.8176 440.249 52.8134 441.113C52.8087 442.061 52.5946 442.894 52.171 443.613C51.7594 444.332 51.1807 444.894 50.4347 445.3C49.7007 445.694 48.8417 445.889 47.8577 445.886Z' />
        <rect x='1392' y='82' width='4' height='20' className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[3] })} />
        <rect x='943' y='178' width='4' height='20' className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[2] })} />
        <rect x='494' y='321' width='4' height='20' className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[1] })} />
        <rect x='43' y='397' width='4' height='20' className={cx(styles.highlightFill, styles.dataPoint, { [styles.dataPointVisible]: activePoints[0] })} />
      </svg>
    </div>
  )
}
