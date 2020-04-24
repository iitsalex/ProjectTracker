import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Table, Card } from 'react-bootstrap'

// https://codesandbox.io/s/-w5szl use this link instead???
// fake data generator
const getnewTasks = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getnewTaskstyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the newTasks look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'darkgrey' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});


class Dashboard extends Component {
  state = {
        newTasks: getnewTasks(10),
        inProgressTasks: getnewTasks(5, 10),
        doneTasks: getnewTasks(10, 15)
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'newTasks',
        droppable2: 'inProgressTasks',
        droppable3: 'doneTasks'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const newTasks = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { newTasks };

            if (source.droppableId === 'droppable2') {
                state = { inProgressTasks: newTasks };
            }else if(source.droppableId === 'droppable3') {
                state = { doneTasks: newTasks };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                newTasks: result.droppable,
                inProgressTasks: result.droppable2,
                doneTasks: result.droppable3
            });
        }
    };

    render() {
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>New</th>
                <th>In Progress</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <td>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}>
                                {this.state.newTasks.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getnewTaskstyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}>
                                                {item.content} {/* comment this out when u wanna do the card instead */}

                                                {/*}// {<Card>
                                                //   <Card.Body>
                                                //     <Card.Title>As a user I want a working Bootleg Jira</Card.Title>
                                                //     <Card.Subtitle className="mb-2 text-muted">Sprint 1: 04/22 - 04/28</Card.Subtitle>
                                                //     <Card.Text>
                                                //       God help this project.
                                                //     </Card.Text>
                                                //   </Card.Body>
                                                // </Card>} */}

                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </td>

                <td>
                  <Droppable droppableId="droppable2">
                      {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              style={getListStyle(snapshot.isDraggingOver)}>
                              {this.state.inProgressTasks.map((item, index) => (
                                  <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}>
                                      {(provided, snapshot) => (
                                          <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={getnewTaskstyle(
                                                  snapshot.isDragging,
                                                  provided.draggableProps.style
                                              )}>
                                              {item.content}
                                          </div>
                                      )}
                                  </Draggable>
                              ))}
                              {provided.placeholder}
                          </div>
                      )}
                  </Droppable>
                </td>

                <td>
                <Droppable droppableId="droppable3">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.inProgressTasks.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getnewTaskstyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </td>
              </DragDropContext>
            </tr>
            </tbody>
          </Table>
        );
    }
}

// Put the thing into the DOM!
export default Dashboard
