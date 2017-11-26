// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import { getPathToResources } from '../league-flash/utils/utils';

import styles from './Editor.css';

const baseURI = `${getPathToResources()}/editorInstructions`;

type Props = {
  dialogOpen: boolean,
  closeDialog: () => void
};

const InstructionsDialog = (props: Props) => {
  return (
    <Dialog
      title="Instructions"
      actions={
        <RaisedButton
          primary
          label="UNDERSTOOD!"
          onClick={props.closeDialog}
        />
      }
      modal={false}
      open={props.dialogOpen}
      onRequestClose={props.closeDialog}
      autoScrollBodyContent={true}
    >
      <div className={styles.dialogContainer}>
        <section className={styles.dialogSection}>
          <p>This software is an utility to map some elements in your in-game UI so you can click on them to activate League Flash features</p>
        </section>
        <Divider />
        <section className={styles.dialogSection}>
          <img
            src={`${baseURI}/center.jpg`}
            style={{ width: '200px' }}
          />
          <div className={styles.description}>
            <p><i>Try to center the dotted box with the summoner spell image outline like in the picture</i></p>
            <p>The box has the following properties:</p>
            <table>
              <tr className={styles.tableRow}>
                <td>x</td>
                <td>The horizontal distance (in pixels) from the top-left corner of the screenshot</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>y</td>
                <td>The vertical distance (in pixels) from the top-left corner of the screenshot</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>width</td>
                <td>The width of the box (in pixels) calculated from the point P(x, y) going right</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>height</td>
                <td>The width of the box (in pixels) calculated from the point P(x, y) going down</td>
              </tr>
            </table>
          </div>
        </section>
        <Divider />
        <section className={styles.dialogSectionCol}>
          <div className={styles.description}>
            <p><i>To do this you have a few basic tools available:</i></p>
            <p>In the bottom part of the screen you will find a bar with the following commands</p>
            <table>
              <tr className={styles.tableRow}>
                <td>x</td>
                <td>changes the x coordinate of the box</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>y</td>
                <td>changes the y coordinate of the box</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>width</td>
                <td>changes the width of the box</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>height</td>
                <td>changes the height of the box</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>TOOLTIP: RIGHT</td>
                <td>This button changes the tooltip position from the left of the box to the right or viceversa</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><InfoIcon /></td>
                <td>Brings up this dialog</td>
              </tr>
            </table>
            <img
              src={`${baseURI}/screen2.jpg`}
              style={{ width: '100%' }}
            />
          </div>
        </section>
        <Divider />
        <section className={styles.dialogSection}>
          <img
            src={`${baseURI}/tooltip.jpg`}
            style={{ width: '250px' }}
          />
          <div className={styles.description}>
            <p><i>This is the tooltip that comes up near the box you selected, it's useful for small adjustments</i></p>
            <p>This tooltip has two modes:</p>
            <table>
              <tr className={styles.tableRow}>
                <td>Position</td>
                <td>Controls the position of the box relative to the screenshot</td>
              </tr>
              <tr className={styles.tableRow}>
                <td>Box Size</td>
                <td>Controls the size of the box</td>
              </tr>
            </table>
          </div>
        </section>
        <Divider />
        <section className={styles.dialogSection}>
          <img
            src={`${baseURI}/position.jpg`}
            style={{ width: '250px' }}
          />
          <div className={styles.description}>
            <p><b>Position</b> tooltip mode:</p>
            <table>
              <tr className={styles.tableRow}>
                <td>⇧</td>
                <td>This button moves the box up one pixel. Equals to setting <pre>y: (y - 1)</pre></td>
              </tr>
              <tr className={styles.tableRow}>
                <td>⇦</td>
                <td>This button moves the box left one pixel. Equals to setting <pre>x: (x - 1)</pre></td>
              </tr>
              <tr className={styles.tableRow}>
                <td>⇨</td>
                <td>This button moves the box right one pixel. Equals to setting <pre>x: (x + 1)</pre></td>
              </tr>
              <tr className={styles.tableRow}>
                <td>⇩</td>
                <td>This button moves the box down one pixel. Equals to setting <pre>y: (y + 1)</pre></td>
              </tr>
            </table>
          </div>
        </section>
        <Divider />
        <section className={styles.dialogSection}>
          <img
            src={`${baseURI}/box-size.jpg`}
            style={{ width: '250px' }}
          />
          <div className={styles.description}>
            <p><b>Box Size</b> tooltip mode:</p>
            <table>
              <tr className={styles.tableRow}>
                <td>⬄ +</td>
                <td>This button makes the box wider by one pixel. Equals to setting <pre>width: (width + 1)</pre></td>
              </tr>
              <tr className={styles.tableRow}>
                <td>⬄ -</td>
                <td>This button makes the box thinner by one pixel. Equals to setting <pre>width: (width - 1)</pre></td>
              </tr>
              <tr className={styles.tableRow}>
                <td>⇳ +</td>
                <td>This button makes the box higher by one pixel. Equals to setting <pre>height: (height + 1)</pre></td>
              </tr>
              <tr className={styles.tableRow}>
                <td>⇳ -</td>
                <td>This button makes the box smaller by one pixel. Equals to setting <pre>height: (height - 1)</pre></td>
              </tr>
            </table>
            <p>Note: The pixels will be added or subtracted to the bottom/right of the box</p>
          </div>
        </section>
      </div>
    </Dialog>
  );
}

export default InstructionsDialog;
