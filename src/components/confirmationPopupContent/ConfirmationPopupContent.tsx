import React, { useState } from 'react'
import Button from '@components/ui/button/Button'
import { Loader } from '@components/ui/loader/Loader'
import styles from './styles.module.scss'
import errorIcon from '@assets/images/status/error.svg'
import { ResponseError } from '@common/types/requests'

type Props = {
	title: string | React.ReactNode
	description?: string
	onConfirm: () => Promise<ResponseError | undefined>
	onSuccess?: () => void
	onClose: () => void
	errorTitle?: string | React.ReactNode
}

export default function ConfirmationPopupContent(
	props: Props
): React.JSX.Element {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<ResponseError | undefined>()

	const onClose = () => {
		props.onClose()
		setError(undefined)
	}

	const handleConfirm = () => {
		setIsLoading(true)
		props
			.onConfirm()
			.then(res => {
				if (!res) {
					onClose()
					setTimeout(() => props.onSuccess?.(), 200)
				} else {
					setError(res)
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	if (isLoading) {
		return (
			<div className={styles.content}>
				<p className={styles.title}>Отправляем запрос...</p>
				<Loader />
			</div>
		)
	}

	return (
		<div className={styles.content}>
			<p className={styles.title}>
				{error
					? props.errorTitle || 'Произошла непредвиденная ошибка'
					: props.title}
			</p>
			{(undefined !== props.description || error) && (
				<p className={styles.description}>
					{error ? error.message : props.description}
				</p>
			)}
			{error ? (
				<>
					<img src={errorIcon} alt='Error' className={styles.icon} />
					<Button
						variant='fill'
						onClick={() =>
							window.location.replace(import.meta.env.VITE_TELEGRAM_SUPPORT_URL)
						}
						text='Техподдержка'
					/>
				</>
			) : (
				<div className={styles.buttons}>
					<Button variant='text' onClick={onClose} text='Отменить' />
					<Button variant='fill' onClick={handleConfirm} text='Подтвердить' />
				</div>
			)}
		</div>
	)
}
