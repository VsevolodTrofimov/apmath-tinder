import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import Card from '@components/_core/Card~'
import List from '@components/_core/List~'
import Space from '@components/_core/Space~'
import H from '@components/_core/Header~'

import Button from '@components/_input/Button~'
import TextInput from '@components/_input/Text~'
import TagInput from '@components/_input/TagInput~'

import TaskEdit from '@components/task/Edit/TaskEdit'

import styles from './MentorPageEdit.sass'

const containerOf = type => PropTypes.oneOfType([
    PropTypes.arrayOf(type),
    PropTypes.objectOf(type)
])

const propTypes = {
    name: PropTypes.string.isRequired,
    contacts: containerOf(PropTypes.string).isRequired,
    fields: containerOf(PropTypes.string).isRequired,
    
    tasks: containerOf(PropTypes.string),
    
    acceptsOwn: PropTypes.oneOf(['none', 'any', 'inField']),
    hLevel: PropTypes.number,
    innerSpace: PropTypes.string
}

const defaultProps = {
    hLevel: 2,
    innerSpace: 'm',
    acceptsOwn: 'none',
    tasks: [],
    ex: []
}

const ownToRus = {
    none: 'Никогда',
    inField: 'В интересных вам областях',
    any: 'В любой области'
}

class TaskEditItem extends React.Component {
    render() {
        const handlers = this.props.makeTaskHandlers(this.props.keyValue)

        return (
            <Card>
                <TaskEdit {...(this.props)}
                          handleTitleChange = {handlers.titleChange}
                          handleDescChange  = {handlers.descChange}
                          handleSkillsChange= {handlers.skillsChange}
                          handleRemove      = {handlers.remove} />
            </Card>
        )
    }
}

const MentorPageEdit = observer(props => {
    const acceptsOwnEl = []
    for(let option in ownToRus) {
        acceptsOwnEl.push(
            <option value={option} key={option}> 
                {ownToRus[option]}
            </option>
        )
    }
    
    return (
        <div className={styles.view}>
            <Space bottom='m'>
                <H level={2}> Редактирование </H>
            </Space>

            <Space bottom='m'>
                <H level={3}> ФИО </H>
                <TextInput id='fullName' 
                           value={props.name}
                           onChange={props.handleNameChange}
                           autoFocus /> 
            </Space>
        
            <Space bottom='m'>
                <H level={3}> Контакты </H>
                <TagInput tags={props.contacts} tagProps={{transparent: true}} />
            </Space>

            <Space bottom='m'>
                <H level={3}> Интересные вам области исследований </H> 
                <Space bottom='xxs' />
                <TagInput tags={props.fields} />
            </Space>


            <Space bottom='m'>
                <H level={3}> Принимаете поднаучных со своей темой исследований </H> 
                <Space bottom='xxs' />
                <select value={props.acceptsOwn} onChange={props.handleAcceptsOwnChange}>
                    {acceptsOwnEl} 
                </select>
            </Space>

            <Space bottom='m'>
                <H level={3}> Задачи для поднаунчных </H> 
                <Space bottom='xs' />
                
                <List data={props.tasks}
                    getKey={(data, idx) => idx}
                    divider={<hr />}
                    item={TaskEditItem}
                    itemProps={{makeTaskHandlers: props.makeTaskHandlers}} />
                {props.tasks.length ? <Space bottom='m' /> : null}

                <Button onClick={props.handleAddTask}> Добавить задачу </Button> 
            </Space>

            <Space bottom='0'>
                <H level={3}> Сохранить изменения? </H> 
                <Space bottom='xs' />
                <div className={styles.row}>
                    <Space right='s'>
                        <Button onClick={props.handleSave}> Сохранить </Button> 
                    </Space>
                    <Button onClick={props.handleRevert}> Вернуть как было </Button>
                </div>
            </Space>
        </div>
    )
})

MentorPageEdit.propTypes    = propTypes
MentorPageEdit.defaultProps = defaultProps


export default MentorPageEdit