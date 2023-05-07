import json
import streamlit as st
import pyperclip
st.title("xPrompt")
st.text('Get best ChatGPT prompts')
with open('prompt.json', 'r') as f:
    data = json.load(f)

search_term = st.text_input('Search', '', key='search_box', placeholder='Prompt')

if search_term:
    filtered_data = {key: value for key, value in data.items() if search_term.lower() in key.lower()}
else:
    filtered_data = data


for key in filtered_data.keys():
    st.write('Act as', key)
    copy_button = st.button(f'{filtered_data[key]}', key=key)
    if copy_button:
        pyperclip.copy(filtered_data[key])
        st.success(f'Copied to clipboard!')