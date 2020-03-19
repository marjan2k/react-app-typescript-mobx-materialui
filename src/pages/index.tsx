import React from 'react';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import withRoot from '../withRoot';
import InfoCard from "../components/InfoCard";
import {IStore} from "../store/RootStore/interface/IStore";
import {RootStore} from "../store/RootStore";
import {inject, observer} from "mobx-react";
import Grid from "@material-ui/core/Grid/Grid";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

@inject('store')
@observer
class Index extends React.Component<IStore> {

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const {store} = this.props;
    const {collectionOrder, reorder} = store as RootStore;

    reorder(
      collectionOrder,
      result.source.index,
      result.destination.index
    );
  };

  grid = 8;

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: this.grid * 2,
    margin: `0 0 ${this.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: this.grid,
    maxWidth: 900,
  });

  render() {
    const {store} = this.props;
    const {collectionOrder} = store as RootStore;
    return (
      <Grid container justify='center'>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={this.getListStyle(snapshot.isDraggingOver)}
              >
                {collectionOrder.map((collectionStore, index) => (
                  <Draggable key={collectionStore.name} draggableId={collectionStore.name} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={this.getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Grid container justify='center' spacing={8} alignContent='stretch'>
                          <InfoCard key={collectionStore.name} collectionStore={collectionStore} />
                        </Grid>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    );
  }
}

export default withRoot((Index));
