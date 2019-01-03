<?php
  class Frigo_model extends CI_Model {

    public function get_cards_by_creator($creator) {
      $this->db->select('Identity, Width, Height, Top, Left, Content, Index');
      $this->db->where('Creator', $creator);
      $query = $this->db->get('cards');
      return $query->result();
    }

    public function insert_card() {
      $data = array(
        'Creator' => $_POST['creator'],
        'Identity' => $_POST['identity'],
        'Width' => $_POST['width'],
        'Height' => $_POST['height'],
        'Top' => $_POST['top'],
        'Left' => $_POST['left'],
        'Index' => $_POST['index']
      );

      $this->db->insert('cards', $data);
    }

    public function update_size() {
      $creator = $_POST['creator'];
      $identity = $_POST['identity'];

      $data = array( 
        'Width' => $_POST['width'], 
        'Height' => $_POST['height'] 
      );

      $this->db->set($data); 
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->update('cards', $data);
    }

    public function update_position() {
      $creator = $_POST['creator'];
      $identity = $_POST['identity'];

      $data = array( 
        'Top' => $_POST['top'], 
        'Left' => $_POST['left']
      ); 

      $this->db->set($data); 
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->update('cards', $data);
    }

    public function update_content() {
      $creator = $_POST['creator'];
      $identity = $_POST['identity'];

      $data = array( 
        'Content' => $_POST['content']
      );

      $this->db->set($data); 
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->update('cards', $data);
    }

    public function delete_card() {
      $creator = $_POST['creator'];
      $identity = $_POST['identity'];
      
      $this->db->where('Creator', $creator);
      $this->db->where('Identity', $identity);
      $this->db->delete('cards');
    }
  }
?>