const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a forgein land and hears sounds of your village being attacked.',
    options: [
      {
        text: 'There is a sword in the corner you grab it ',
        setState: { sword: true },
        nextText: 2
      },
      {
        text: 'Hide in cellar',
        nextText: 2
      },
      {
        text: 'try to sneak out and jump out of window',
        nextText:2
      },
      {
        text: 'Go back to sleep',
        nextText:31
      }
    
    ]
  },
  {
    id: 2,
    text: 'You encounter some monsters attacking some people.',
    options: [
      {
        text: 'fight',
        requiredState: (currentState) => currentState.sword,
        setState: { sword: false, sword: true },
        nextText: 20
      },

      {
        text: 'use it as a distraction to flee',
        nextText: 3
      }
    ]
  },
  {
    id: 31,
    text: 'You have be captured',
    options: [
      {
        text: 'wake up',
        nextText: -1
      },
      
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 20,
    text: 'You managed to help fight of attack force, and have been given orders to send for help',
    options: [
      {
        text: 'head to town over',
        nextText: 21
      },

      {
        text: 'head over to citedal',
        nextText: 26
      }
    ]
  },
  
  
]

startGame()
  
  