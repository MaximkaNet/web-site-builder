// Type for the save callback function
type SaveCallback = (text: string) => Promise<void> | void

// Return type interface for better intellisense
interface UseEditableTextReturn {
  text: Ref<string>
  isEditing: Ref<boolean>
  elementRef: Ref<HTMLElement | null>
  handleInput: (event: Event) => void
  handleFocus: () => void
  handleBlur: () => Promise<void>
  handleKeydown: (event: KeyboardEvent) => void
}

export const useEditableText = (initialValue: string = '', saveCallback: SaveCallback | null = null): UseEditableTextReturn => {
  const text = ref<string>(initialValue)
  const isEditing = ref<boolean>(false)
  const elementRef = ref<HTMLElement | null>(null)

  const handleInput = (event: Event) => {
    const target = event.target as HTMLElement
    if (target?.textContent !== null) {
      text.value = target.textContent
    }
  }

  const handleFocus = () => {
    isEditing.value = true
  }

  const handleBlur = async () => {
    isEditing.value = false
    if (saveCallback) {
      await saveCallback(text.value)
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      elementRef.value?.blur()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      if (elementRef.value) {
        elementRef.value.textContent = text.value
        elementRef.value.blur()
      }
    }
  }

  return {
    text,
    isEditing,
    elementRef,
    handleInput,
    handleFocus,
    handleBlur,
    handleKeydown
  }
}